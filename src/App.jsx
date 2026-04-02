import React, { useState } from 'react';
import { 
  Activity, 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck, 
  Package, 
  Camera, 
  Bell, 
  Settings, 
  Search,
  FileText,
  MousePointer2,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 relative overflow-hidden group transition-all"
  >
    <div className={`absolute top-0 right-0 w-16 h-16 bg-${color}-500/5 blur-3xl rounded-full group-hover:scale-150 transition-transform`} />
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`text-${color}-400`} size={20} />
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</p>
    <p className="text-2xl font-black text-white mt-1">{value}</p>
  </motion.div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex text-white font-sans selection:bg-accent/30 selection:text-white">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-white/5 flex flex-col items-center lg:items-stretch py-8 bg-[#080808]">
        <div className="px-6 mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-accent to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
            <Cpu size={24} className="text-black" />
          </div>
          <span className="hidden lg:block text-lg font-black tracking-tighter">NEXUS AI</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'dashboard', icon: Activity, label: 'Dashboard' },
            { id: 'insumos', icon: Package, label: 'Analista de Insumos' },
            { id: 'pacientes', icon: Users, label: 'Pacientes' },
            { id: 'financeiro', icon: DollarSign, label: 'Financeiro' },
            { id: 'calendario', icon: Calendar, label: 'Agenda' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-accent/10 border border-accent/20 text-accent' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="hidden lg:block font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
          <div className="bg-[#0c0c0c] rounded-2xl p-4 border border-white/5 hidden lg:block">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={14} className="text-accent" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Plano Pro</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">5/10 Scans de visão usados hoje.</p>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-accent" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#050505]/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-96">
            <Search size={16} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar paciente ou insumo..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell size={20} className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border-2 border-[#050505]" />
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Dr. Bruno Souto</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Diretor Médico</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Bruno+Souto&background=random" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard View */}
        <div className="p-8 pb-20">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <p className="text-accent font-bold text-sm mb-1 uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} /> Bem-vindo ao Nexus AI Bills
              </p>
              <h2 className="text-3xl font-black">Dashboard ClinicDash</h2>
            </div>
            <div className="flex gap-3">
               <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">Relatórios</button>
               <button className="bg-accent text-black px-4 py-2 rounded-xl text-xs font-black hover:scale-95 transition-all">+ Nova Consulta</button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Pacientes" value="1,284" icon={Users} trend={12.5} color="purple" />
            <StatCard title="Receita Mês" value="R$ 45.2k" icon={DollarSign} trend={8.2} color="green" />
            <StatCard title="Consultas Hoje" value="18" icon={Calendar} trend={-2.4} color="blue" />
            <StatCard title="Economia Insumos" value="R$ 3.8k" icon={TrendingUp} trend={24.1} color="accent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visual Parser Simulation */}
            <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-1">Analista de Insumos (Visão AI)</h3>
                        <p className="text-sm text-gray-500">Envie fotos de listas ou notas para extração automática</p>
                    </div>
                </div>

                <div className="bg-[#050505] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-12 transition-all hover:border-accent/30 group cursor-pointer" onClick={startScan}>
                    <AnimatePresence>
                        {isScanning ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-full h-80 max-w-md bg-white/5 rounded-lg relative overflow-hidden">
                                     <FileText className="absolute inset-0 m-auto text-white/10" size={120} />
                                     <motion.div 
                                        initial={{ top: '-10%' }}
                                        animate={{ top: '110%' }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 w-full h-1 bg-accent shadow-[0_0_20px_#39ff14] z-50"
                                     />
                                </div>
                                <p className="mt-4 text-accent font-black animate-pulse">PROCESSANDO LISTA DE MATERIAIS...</p>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Camera size={24} className="text-gray-500 group-hover:text-accent" />
                                </div>
                                <p className="text-sm text-gray-400 max-w-xs">Arraste fotos de listas de materiais ou rascunhos médicos aqui para identificar itens e quantidades.</p>
                                <span className="mt-4 text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-bold">Limites: 10 fotos/dia</span>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-6">Últimas Atividades</h3>
                <div className="space-y-6">
                    {[
                        { title: 'Extração Concluída', time: '2m atrás', type: 'info', detail: 'Lista de Gaze e Soro' },
                        { title: 'Nova Consulta', time: '15m atrás', type: 'success', detail: 'Carlos Oliveira' },
                        { title: 'Pendente Pagamento', time: '1h atrás', type: 'warn', detail: 'Nota 4421' }
                    ].map((act, i) => (
                        <div key={i} className="flex gap-4">
                            <div className={`w-1 h-10 rounded-full ${act.type === 'success' ? 'bg-green-500' : act.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                            <div>
                                <p className="text-xs font-black text-white">{act.title}</p>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{act.detail}</p>
                                <p className="text-[10px] text-gray-600 mt-1">{act.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">Ver Histórico Completo</button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Cursor/Effect? */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/5 blur-[150px] rounded-full animate-pulse-slow" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 blur-[150px] rounded-full animate-pulse-slow" />
      </div>
    </div>
  );
};

export default App;
