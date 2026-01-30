import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Zap, Target, Shield, Eye } from 'lucide-react';

const abilities = [
  {
    title: "WALL CLIMBING",
    icon: <Target className="w-8 h-8" />,
    desc: "Electrostatic attraction allows Peter to adhere to almost any surface with incredible grip strength.",
    img: "https://images.unsplash.com/photo-1762417582804-3a96fb0705f4?auto=format&fit=crop&q=80&w=500",
    color: "#B11226"
  },
  {
    title: "SPIDEY SENSE",
    icon: <Eye className="w-8 h-8" />,
    desc: "A precognitive danger warning that allows him to react to threats before they even materialize.",
    img: "https://images.unsplash.com/photo-1625685554446-9c0dc87d506a?auto=format&fit=crop&q=80&w=500",
    color: "#00E5FF"
  },
  {
    title: "WEB SHOOTERS",
    icon: <Zap className="w-8 h-8" />,
    desc: "Custom-built wrist devices that eject a synthetic webbing fluid with immense tensile strength.",
    img: "https://images.unsplash.com/photo-1743357017902-682448d04ee4?auto=format&fit=crop&q=80&w=500",
    color: "#B11226"
  },
  {
    title: "SUPER AGILITY",
    icon: <Shield className="w-8 h-8" />,
    desc: "Reflexes 40 times faster than a normal human, allowing him to dodge bullets and perform impossible feats.",
    img: "https://images.unsplash.com/photo-1762417582804-3a96fb0705f4?auto=format&fit=crop&q=80&w=500",
    color: "#00E5FF"
  }
];

export const Abilities = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#B11226] font-mono tracking-[0.5em] text-sm mb-4"
        >
          ULTIMATE POWERS
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase"
        >
          NOT JUST A <span className="text-[#00E5FF]">MAN</span>
        </motion.h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {abilities.map((ability, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative h-[450px] overflow-hidden rounded-2xl border border-white/5 bg-[#050D18]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110">
              <ImageWithFallback
                src={ability.img}
                alt={ability.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <motion.div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${ability.color}20`, border: `1px solid ${ability.color}` }}
              >
                <div style={{ color: ability.color }}>{ability.icon}</div>
              </motion.div>
              
              <h4 className="text-2xl font-black italic uppercase mb-4 group-hover:text-[#00E5FF] transition-colors">
                {ability.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                {ability.desc}
              </p>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute -inset-1 border-2 border-[#00E5FF]/20 rounded-2xl blur-sm" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
