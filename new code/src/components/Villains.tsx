import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const villains = [
  {
    name: "GREEN GOBLIN",
    alias: "Norman Osborn",
    desc: "Spider-Man's greatest nemesis, fueled by the Goblin Formula and armed with high-tech gliders.",
    img: "https://images.unsplash.com/photo-1608918109167-eda6ab198da3?auto=format&fit=crop&q=80&w=800",
    color: "#4ADE80"
  },
  {
    name: "DOC OCK",
    alias: "Otto Octavius",
    desc: "A brilliant scientist with four powerful mechanical tentacles fused to his spine.",
    img: "https://images.unsplash.com/photo-1623679971411-7b7d672bca5b?auto=format&fit=crop&q=80&w=800",
    color: "#FCD34D"
  },
  {
    name: "VENOM",
    alias: "Eddie Brock",
    desc: "An alien symbiote with a burning hatred for Peter Parker, possessing all of his powers and more.",
    img: "https://images.unsplash.com/photo-1762895158802-507fb6d7aa7e?auto=format&fit=crop&q=80&w=800",
    color: "#B11226"
  }
];

export const Villains = () => {
  return (
    <div className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#B11226] font-mono tracking-widest text-sm mb-4 uppercase">Rogues Gallery</h2>
            <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
              DANGEROUS <br />
              <span className="text-[#B11226]">ADVERSARIES</span>
            </h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 text-sm max-w-xs text-right font-medium"
          >
            Each villain represents a personal failure or a twisted reflection of the hero himself.
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-3xl overflow-hidden">
          {villains.map((villain, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              className="relative group h-[600px] border-r border-white/10 last:border-0 overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                variants={{
                  hover: { scale: 1.1 }
                }}
              >
                <ImageWithFallback
                  src={villain.img}
                  alt={villain.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </motion.div>

              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <motion.div
                  variants={{
                    hover: { y: -20 }
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xs font-black tracking-[0.3em] text-white/50 mb-2 block uppercase">{villain.alias}</span>
                  <h4 className="text-4xl font-black italic uppercase mb-6 group-hover:text-[#B11226] transition-colors">{villain.name}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                    {villain.desc}
                  </p>
                </motion.div>
                
                <motion.button 
                  className="mt-8 text-xs font-black tracking-widest uppercase py-3 px-6 border border-white/20 hover:border-[#B11226] hover:bg-[#B11226] transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  THREAT INTEL
                </motion.button>
              </div>

              {/* Red Laser Line on Hover */}
              <motion.div 
                className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#B11226] shadow-[0_0_15px_rgba(177,18,38,0.8)] opacity-0 group-hover:opacity-100"
                initial={{ height: 0 }}
                variants={{
                  hover: { height: "100%" }
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
