import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const suits = [
  {
    name: "Classic Suit",
    desc: "The iconic red and black suit, a gift from Peter Parker.",
    img: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&q=80&w=800",
    color: "#DC0000"
  },
  {
    name: "Brooklyn Visions",
    desc: "Represent Miles' school pride with this athletic variant.",
    img: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&q=80&w=800",
    color: "#FFD700"
  },
  {
    name: "2020 Suit",
    desc: "A futuristic high-tech suit with LED mask display.",
    img: "https://images.unsplash.com/photo-1679485205984-4ce35c32b2d6?auto=format&fit=crop&q=80&w=800",
    color: "#00D9FF"
  },
  {
    name: "Spider-Verse",
    desc: "Step directly out of the animated multiverse.",
    img: "https://images.unsplash.com/photo-1748334851873-51578624a2cc?auto=format&fit=crop&q=80&w=800",
    color: "#FF006E"
  },
  {
    name: "Crimson Cowl",
    desc: "A stealthy hooded design for urban operations.",
    img: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&q=80&w=800",
    color: "#8B4513"
  }
];

export const SuitGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-black overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Animated Background Text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full flex flex-col pointer-events-none opacity-5 select-none">
          <motion.h2 
            style={{ x: useTransform(scrollYProgress, [0, 1], [100, -1000]) }}
            className="text-[25vw] font-black italic tracking-tighter whitespace-nowrap leading-none"
          >
            SELECT YOUR STYLE
          </motion.h2>
          <motion.h2 
            style={{ x: useTransform(scrollYProgress, [0, 1], [-500, 500]) }}
            className="text-[25vw] font-black italic tracking-tighter whitespace-nowrap leading-none text-right"
          >
            SUIT UP BROOKLYN
          </motion.h2>
        </div>

        <div className="relative px-6 md:px-20 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-[#DC0000] font-mono tracking-widest text-sm mb-4 uppercase">The Wardrobe</h2>
            <h3 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
              GEAR <br />
              <span className="text-white">COLLECTION</span>
            </h3>
          </div>
          <div className="hidden md:block text-right text-gray-500 font-mono text-sm max-w-xs">
            // UNLOCKABLE CONTENT // 12 AVAILABLE VARIANTS // TECH UPGRADES ENABLED
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-20 relative z-10">
          {suits.map((suit, i) => (
            <motion.div
              key={`suit-${i}`}
              whileHover={{ y: -20, scale: 1.02 }}
              className="relative min-w-[350px] md:min-w-[450px] h-[550px] rounded-[2rem] overflow-hidden group border border-white/5 bg-[#0A0A0A]"
            >
              <ImageWithFallback
                src={suit.img}
                alt={suit.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="h-px w-12 bg-white/20" />
                    <span className="text-xs font-black tracking-widest uppercase" style={{ color: suit.color }}>Spec: S-Grade</span>
                 </div>
                 <h4 className="text-4xl font-black italic uppercase leading-tight mb-4 group-hover:text-white transition-colors">{suit.name}</h4>
                 <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   {suit.desc}
                 </p>
                 
                 <button className="w-full py-4 border border-white/10 rounded-xl font-black tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all">
                   EQUIP SUIT
                 </button>
              </div>

              {/* Suit Tech Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundColor: suit.color }} />
              </div>
            </motion.div>
          ))}
          
          {/* Completion Spacer */}
          <div className="min-w-[450px] flex items-center justify-center border-4 border-dashed border-white/5 rounded-[2rem]">
             <div className="text-center opacity-30">
                <span className="text-4xl font-black italic uppercase tracking-tighter">More coming in DLC</span>
             </div>
          </div>
        </motion.div>

        {/* Gallery Scroll Progress */}
        <div className="absolute bottom-12 left-20 right-20 h-[2px] bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             style={{ scaleX: scrollYProgress }} 
             className="absolute inset-0 bg-[#DC0000] origin-left shadow-[0_0_15px_#DC0000]"
           />
        </div>
      </div>
    </div>
  );
};
