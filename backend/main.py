from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import os
import uvicorn
import base64
import json
from openai import OpenAI
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

app = FastAPI(title="Nexus AI Bills - Vision Parser API")

# CORS for Frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration from Environment Variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "nexus_ai_bills"

# Database Initialization
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
openai_client = OpenAI(api_key=OPENAI_API_KEY)

# Models for Structured Output
class SupplyItem(BaseModel):
    name: str = Field(..., description="Nome do item de insumo (ex: Gaze, Soro)")
    quantity: str = Field(..., description="Quantidade identificada (ex: 50 unidades, 100ml)")
    price_unit: Optional[float] = Field(None, description="Preço unitário se disponível")
    total: Optional[float] = Field(None, description="Total se disponível")

class VisionResult(BaseModel):
    items: List[SupplyItem]
    invoice_number: Optional[str] = None
    date: Optional[str] = None
    total_amount: Optional[float] = None
    vendor: Optional[str] = None

@app.get("/")
async def root():
    return {"status": "Nexus AI Bills Backend Active", "version": "1.0.0"}

@app.post("/parse-vision", response_model=VisionResult)
async def parse_vision(file: UploadFile = File(...)):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="Missing OpenAI API Key")

    try:
        # 1. Read and encode image
        contents = await file.read()
        base64_image = base64.b64encode(contents).decode('utf-8')

        # 2. Vision API Call (GPT-4o for best results)
        response = openai_client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Você é o Nexus AI Vision Parser, um analista de insumos de elite. "
                        "Sua tarefa é extrair itens e quantidades de fotos de listas de materiais médicos, "
                        "notas fiscais ou rascunhos. Retorne exatamente os campos solicitados no esquema JSON."
                    )
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Analise esta imagem e extraia todos os itens de insumos."},
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}
                        }
                    ],
                }
            ],
            response_format=VisionResult
        )

        result = response.choices[0].message.parsed
        
        # 3. Store in MongoDB
        document = result.model_dump()
        document["timestamp"] = datetime.utcnow()
        document["filename"] = file.filename
        await db.extractions.insert_one(document)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
