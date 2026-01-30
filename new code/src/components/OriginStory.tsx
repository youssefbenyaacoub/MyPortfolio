import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const timelineEvents = [
  {
    year: "THE BITE",
    title: "A Life Changed",
    desc: "Average high schooler Peter Parker is bitten by a radioactive spider, gaining superhuman strength, agility, and a precognitive sense.",
    color: "#B11226",
  },
  {
    year: "THE LOSS",
    title: "Great Responsibility",
    desc: "After failing to stop a criminal who later takes the life of his Uncle Ben, Peter learns that power must be balanced by duty.",
    color: "#00E5FF",
  },
  {
    year: "THE HERO",
    title: "New York's Own",
    desc: "Spider-Man becomes a staple of the NYC skyline, balancing college, work, and saving the city from eccentric threats.",
    color: "#B11226",
  },
];

export const OriginStory = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[#00E5FF] font-mono tracking-widest text-sm mb-4">// FILE: 001_ORIGIN</h2>
          <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-12 uppercase leading-none">
            FROM ZERO <br />
            <span className="text-[#B11226]">TO HERO</span>
          </h3>
          
          <div className="space-y-12 relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B11226] via-[#00E5FF] to-transparent hidden md:block" />
            
            {timelineEvents.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative pl-0 md:pl-16 group"
              >
                <div 
                  className="absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-[#0A1A2F] z-10 hidden md:flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: event.color }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                
                <div className="bg-[#0A1A2F]/50 backdrop-blur-sm border border-white/5 p-8 hover:border-[#00E5FF]/40 transition-all duration-300 group-hover:translate-x-2">
                  <span className="text-xs font-black tracking-widest text-[#B11226] mb-2 block">{event.year}</span>
                  <h4 className="text-2xl font-black mb-4 uppercase italic tracking-tight">{event.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#B11226]/20 to-[#00E5FF]/20 blur-2xl rounded-3xl" />
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5] border border-white/10 group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1625685554446-9c0dc87d506a?auto=format&fit=crop&q=80&w=1080"
              alt="Origin Story"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[2px] w-12 bg-[#B11226]" />
                <span className="text-xs font-black tracking-widest text-[#B11226]">S.H.I.E.L.D. DATA</span>
              </div>
              <h4 className="text-3xl font-black italic uppercase">Subject: Parker, P.</h4>
            </div>
          </div>
          
          {/* Floating UI Element */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 w-48 p-4 bg-black/80 backdrop-blur-md border border-[#00E5FF]/50 text-[10px] font-mono leading-tight z-20 hidden md:block"
          >
            <div className="text-[#00E5FF] mb-2 border-b border-[#00E5FF]/20 pb-1 uppercase">Analysis active</div>
            <div className="text-white/60">
              STR: 85/100<br />
              AGL: 98/100<br />
              INT: 92/100<br />
              SENSE: TRIGGERED
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
