import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const images = [
  "https://images.unsplash.com/photo-1548206269-5b8fcd4765bb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1625685554446-9c0dc87d506a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1696680510620-90e35fe7a128?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1608918109167-eda6ab198da3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1623679971411-7b7d672bca5b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1762895158802-507fb6d7aa7e?auto=format&fit=crop&q=80&w=800"
];

export const Gallery = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#00E5FF] font-mono tracking-[0.5em] text-sm mb-4 uppercase"
        >
          Cinematic Archive
        </motion.h2>
        <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
          CAPTURING THE <span className="text-[#B11226]">MOMENTS</span>
        </h3>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-white/5 group cursor-zoom-in"
          >
            <ImageWithFallback
              src={img}
              alt={`Gallery image ${i}`}
              className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-[#B11226]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 p-20 rounded-[3rem] bg-gradient-to-br from-[#B11226] to-[#0A1A2F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1625685554446-9c0dc87d506a?auto=format&fit=crop&q=80&w=1080')] bg-cover bg-center" />
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <h4 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 max-w-2xl">
            READY TO JOIN THE SOCIETY?
          </h4>
          <p className="text-white/70 mb-12 max-w-xl font-medium text-lg leading-relaxed">
            Stay updated with the latest from the multiverse. Exclusive art, behind-the-scenes, and more.
          </p>
          <div className="flex w-full max-w-md gap-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="flex-1 bg-black/40 border border-white/20 px-6 py-4 rounded-xl focus:border-[#00E5FF] outline-none transition-colors font-mono text-sm"
            />
            <button className="px-8 py-4 bg-[#00E5FF] text-black font-black italic tracking-widest uppercase rounded-xl hover:bg-white transition-all transform hover:scale-105">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
