import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  ExternalLink, 
  Code2, 
  Globe, 
  X, 
  Plus, 
  ChevronRight,
  Database,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// --- Design Tokens ---
const THEME = {
  bg: '#030412',
  accent: '#00FFFF', // Aqua / Cyan
  textPrimary: '#F5F5F5',
  textSecondary: '#A3A3A3',
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  indigoGlow: 'rgba(99, 102, 241, 0.1)'
};

const TYPO = {
  h1: "font-['Space_Grotesk',sans-serif] font-black uppercase tracking-tighter leading-[0.85]",
  h2: "font-['Space_Grotesk',sans-serif] font-bold uppercase tracking-tight text-[#F5F5F5]",
  body: "font-['Inter',sans-serif] font-normal leading-relaxed text-[#A3A3A3]",
  tag: "font-['JetBrains_Mono',monospace] text-[10px] font-bold tracking-widest uppercase"
};

// --- Components ---

const GlassCard = ({ children, className = "" }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] ${className}`}>
    {children}
  </div>
);

const TechTag = ({ text }) => (
  <span className={`${TYPO.tag} px-2 py-1 bg-white/5 border border-white/10 rounded text-cyan-400/80`}>
    {text}
  </span>
);

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-[#030412]/90 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,255,255,0.1)]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all">
          <X size={24} />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="h-[300px] md:h-full">
            <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
            <div className="space-y-2">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Project Mission</span>
              <h2 className={`${TYPO.h2} text-4xl md:text-5xl`}>{project.title}</h2>
            </div>
            <p className={`${TYPO.body} text-lg`}>{project.fullDesc || project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => <TechTag key={tag} text={tag} />)}
            </div>
            <div className="pt-6 flex gap-4">
              <button className="flex-1 bg-cyan-500 text-slate-950 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors">Launch Deployment</button>
              <button className="px-6 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-all"><ExternalLink size={20} /></button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Sections ---

const Hero = () => {
  const words = ["Scalable", "Modern", "Secure", "Infinite"];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setWordIdx(p => (p + 1) % words.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-8 md:px-20 overflow-hidden">
      {/* Background Starfield */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback src="https://images.unsplash.com/photo-1767188789485-54e0922d76a8" alt="Deep Space" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030412]/50 to-[#030412]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Full-Stack Engineer</span>
          </motion.div>
          
          <div className="space-y-4">
            <h1 className={`${TYPO.h1} text-[10vw] md:text-8xl text-white`}>Building</h1>
            <AnimatePresence mode="wait">
              <motion.h1 
                key={words[wordIdx]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`${TYPO.h1} text-[10vw] md:text-8xl text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]`}
              >
                {words[wordIdx]}
              </motion.h1>
            </AnimatePresence>
            <h1 className={`${TYPO.h1} text-[10vw] md:text-8xl text-white`}>Ecosystems.</h1>
          </div>

          <p className={`${TYPO.body} text-lg md:text-xl max-w-lg`}>
            Navigating the digital void to architect high-performance, immersive web environments with precision and cosmic-scale infrastructure.
          </p>

          <div className="flex items-center gap-8 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,255,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-cyan-500 text-slate-950 font-black rounded-2xl uppercase tracking-widest text-xs"
            >
              Initiate Mission
            </motion.button>
            <button className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.2em] group">
              Explore Log <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative hidden md:block"
        >
          <motion.div 
            animate={{ y: [0, -30, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="z-10 relative"
          >
            <ImageWithFallback src="https://images.unsplash.com/photo-1712511630977-b1265d1ac907" alt="Astronaut" className="w-full h-auto drop-shadow-[0_0_60px_rgba(99,102,241,0.3)]" />
          </motion.div>
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-cyan-400/10 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square border border-indigo-400/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </motion.div>
      </div>
    </section>
  );
};

const WorkExperience = () => {
  const journey = [
    { date: "2024 - PRESENT", role: "Senior Core Developer", company: "CyberNexus", desc: "Orchestrating planetary-scale microservices and real-time data sync." },
    { date: "2022 - 2024", role: "Software Architect", company: "Nebula Apps", desc: "Designed event-driven systems with 99.9% uptime in the edge cloud." },
    { date: "2020 - 2022", role: "UI/UX Architect", company: "Vector UI", desc: "Pioneering glassmorphic interfaces and immersive user flow systems." }
  ];

  return (
    <section className="py-32 px-8 bg-[#030412]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
           <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em]">Phase 02 / The Journey</span>
           <h2 className={`${TYPO.h2} text-4xl md:text-6xl`}>Mission Log.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {journey.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full group hover:bg-cyan-400/5 hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-cyan-400 font-mono text-xs">{item.date}</span>
                    <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all">
                      <Cpu size={20} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.role}</h3>
                    <p className="text-indigo-400 font-bold text-sm tracking-wider">{item.company}</p>
                  </div>
                  <p className={`${TYPO.body} text-sm`}>{item.desc}</p>
                  <div className="flex gap-2">
                    <TechTag text="Kubernetes" />
                    <TechTag text="Node.js" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SelectedProjects = () => {
  const [selected, setSelected] = useState(null);
  const projects = [
    {
      title: "QUANTUM DASHBOARD",
      desc: "Real-time analytics for intergalactic data transmission.",
      image: "https://images.unsplash.com/photo-1575388902449-6bca946ad549",
      tags: ["React", "GraphQL", "Three.js"],
      fullDesc: "An advanced visualization system designed to handle terabytes of telemetry data with sub-millisecond latency. Built using cutting-edge WebGL rendering."
    },
    {
      title: "NEBULA CRYPTO",
      desc: "Secure vault system for digital assets in the deep void.",
      image: "https://images.unsplash.com/photo-1764258560300-2346b28b4e7c",
      tags: ["Solidity", "Next.js", "Rust"],
      fullDesc: "A highly secure, decentralized finance portal featuring multi-signature authentication and biometric encryption protocols."
    }
  ];

  return (
    <section className="py-32 px-8 bg-[#030412]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
           <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em]">Phase 03 / Selected Systems</span>
           <h2 className={`${TYPO.h2} text-4xl md:text-6xl`}>Active Projects.</h2>
        </div>
        <div className="space-y-24">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full md:w-3/5 group cursor-pointer relative" onClick={() => setSelected(p)}>
                <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center rounded-[2rem]">
                   <div className="w-16 h-16 bg-cyan-400 text-slate-950 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                     <Plus size={32} />
                   </div>
                </div>
                <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                  <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
              <div className="w-full md:w-2/5 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-black text-white">{p.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => <TechTag key={t} text={t} />)}
                  </div>
                </div>
                <p className={`${TYPO.body} text-lg`}>{p.desc}</p>
                <button 
                  onClick={() => setSelected(p)}
                  className="flex items-center gap-3 text-cyan-400 font-bold uppercase tracking-widest text-xs group"
                >
                  Read Mission Data <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="bg-[#030412] text-white selection:bg-cyan-500/30 selection:text-cyan-400 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030412; }
        ::-webkit-scrollbar-thumb { background: #1a1b2e; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #00FFFF; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-cyan-400 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl">Y</div>
             <span className="font-bold tracking-tight text-white hidden md:block">Youssef.dev</span>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-2.5 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Resume</button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <WorkExperience />
        <SelectedProjects />
      </main>

      <footer className="py-20 px-8 border-t border-white/5 bg-[#030412] text-center">
        <div className="max-w-7xl mx-auto space-y-8">
           <div className="flex justify-center gap-8">
             <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors uppercase font-bold text-[10px] tracking-[0.4em]">Github</a>
             <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors uppercase font-bold text-[10px] tracking-[0.4em]">LinkedIn</a>
             <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors uppercase font-bold text-[10px] tracking-[0.4em]">Terminal</a>
           </div>
           <p className="text-slate-700 text-[10px] font-mono uppercase tracking-widest">
             © 2026 TRANSMISSION SECURE // ALL SYSTEMS NOMINAL
           </p>
        </div>
      </footer>
    </div>
  );
}
