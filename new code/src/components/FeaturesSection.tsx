import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { Cpu, Globe, Layers, Zap, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    title: "DYNAMIC RENDERING",
    icon: <Cpu className="w-8 h-8" />,
    desc: "Optimized for real-time 3D environments with zero latency performance.",
    color: "#E10600"
  },
  {
    title: "NEURAL INTERFACE",
    icon: <Layers className="w-8 h-8" />,
    desc: "Adaptive UI systems that learn and respond to user behavior patterns.",
    color: "#00F5FF"
  },
  {
    title: "QUANTUM SECURITY",
    icon: <Shield className="w-8 h-8" />,
    desc: "Unbreakable encryption protocols protecting your digital assets 24/7.",
    color: "#7B3FE4"
  },
  {
    title: "GLOBAL SYNC",
    icon: <Globe className="w-8 h-8" />,
    desc: "Instant synchronization across all nodes in our distributed edge network.",
    color: "#E10600"
  },
  {
    title: "FLUID MOTION",
    icon: <Zap className="w-8 h-8" />,
    desc: "Advanced physics-based animation systems for tactile interactivity.",
    color: "#00F5FF"
  },
  {
    title: "VISUAL FIDELITY",
    icon: <Sparkles className="w-8 h-8" />,
    desc: "Photorealistic art direction applied to the infinite digital canvas.",
    color: "#7B3FE4"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="process" className="py-48 px-6 md:px-24 bg-[#05070A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#E10600]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[#7B3FE4]/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-[#7B3FE4]" />
            <span className="text-[10px] font-black tracking-[0.5em] text-white/60 uppercase">System Features</span>
            <div className="h-px w-12 bg-[#7B3FE4]" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
            CORE <span className="text-[#00F5FF]">TECHNOLOGIES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard>
                <div className="h-full p-10 bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 rounded-3xl group-hover:border-[#00F5FF]/50 transition-colors duration-500 flex flex-col items-start gap-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: `${feature.color}20`, color: feature.color, border: `1px solid ${feature.color}40` }}
                  >
                    {feature.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-black italic tracking-tight uppercase mb-4">{feature.title}</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/5 w-full flex justify-between items-center group/btn">
                    <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Module 0{i+1}</span>
                    <motion.div 
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all"
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
