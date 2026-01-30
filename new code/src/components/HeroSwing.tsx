import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const HeroSwing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax layers
  const ySky = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yBuildingsFar = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yBuildingsNear = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const scaleMiles = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1.2]);
  const xMiles = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  
  const opacityHint = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#0A0A0A]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background Sky */}
        <motion.div style={{ y: ySky }} className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1519313162782-534513bbf34c?auto=format&fit=crop&q=80&w=1920" 
            alt="Brooklyn Night Sky" 
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
          />
        </motion.div>

        {/* Far Buildings */}
        <motion.div style={{ y: yBuildingsFar }} className="absolute inset-0 z-10 flex items-end">
           <div className="w-full h-full opacity-30 flex gap-4 items-end px-12">
             {[...Array(10)].map((_, i) => (
               <div key={`building-far-${i}`} className="flex-1 bg-[#111] border-x border-white/5" style={{ height: `${20 + Math.random() * 40}%` }} />
             ))}
           </div>
        </motion.div>

        {/* Near Buildings (Parallax) */}
        <motion.div style={{ y: yBuildingsNear }} className="absolute inset-0 z-20 flex items-end pointer-events-none">
          <div className="w-full h-full flex gap-12 items-end px-4">
             {[...Array(6)].map((_, i) => (
               <div key={`building-near-${i}`} className="flex-1 bg-[#050505] border-t border-white/10 shadow-2xl relative" style={{ height: `${40 + Math.random() * 40}%` }}>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                 {/* Window lights */}
                 <div className="grid grid-cols-4 gap-2 p-4">
                    {[...Array(20)].map((_, j) => (
                      <div key={`window-${i}-${j}`} className={`w-full h-2 rounded-sm ${Math.random() > 0.8 ? 'bg-[#FFD700]/40' : 'bg-transparent'}`} />
                    ))}
                 </div>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Miles Swinging */}
        <motion.div 
          style={{ scale: scaleMiles, x: xMiles }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-96 h-96">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&q=80&w=800" 
              alt="Miles Swinging" 
              className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(220,0,0,0.3)]"
            />
            
            {/* Dynamic Web Line */}
            <svg className="absolute -top-screen left-1/2 w-px h-screen overflow-visible">
               <motion.line 
                 x1="0" y1="0" x2="-200" y2="-500" 
                 stroke="white" strokeWidth="2" 
                 strokeDasharray="10 5" 
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
               />
            </svg>
          </div>
        </motion.div>

        {/* Snow System Overlay */}
        <div className="absolute inset-0 z-40 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`snow-${i}`}
              initial={{ y: -10, x: Math.random() * 100 + '%' }}
              animate={{ 
                y: '110vh', 
                x: (Math.random() * 100 - 50) + '%' 
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5
              }}
              className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
            />
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center p-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="max-w-4xl"
           >
              <h2 className="text-[#00D9FF] font-mono tracking-[0.5em] text-xs mb-4 uppercase">Brooklyn's New Hero</h2>
              <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-none mb-8">
                BE YOURSELF. <br />
                <span className="text-[#DC0000]">BE GREATER.</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-2xl font-medium tracking-tight max-w-2xl mx-auto italic">
                Swing through the snow-covered streets of New York as Miles Morales discovers explosive new powers.
              </p>
           </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div 
          style={{ opacity: opacityHint }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Scroll to swing</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-[#00D9FF] to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
};
