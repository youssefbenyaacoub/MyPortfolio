import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const CombatSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Action frame mapping
  const actionX = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -200, 200, -300, 400, 0]);
  const actionScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const actionRotation = useTransform(scrollYProgress, [0, 0.5, 1], [0, -10, 5]);
  
  const impactOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const glitchOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0, 0.4, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#0A0A0A] overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        
        {/* Background Urban Lair */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1542389266-f8b2d4f94e54?auto=format&fit=crop&q=80&w=1920" 
            alt="Brooklyn Lair" 
            className="w-full h-full object-cover opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        </div>

        {/* Action Elements */}
        <div className="relative w-full h-full flex items-center justify-center z-10">
          
          {/* Miles in combat */}
          <motion.div
            style={{ 
              x: actionX, 
              scale: actionScale, 
              rotate: actionRotation 
            }}
            className="relative w-[500px] h-[500px]"
          >
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&q=80&w=1080" 
              alt="Miles Combat" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(220,0,0,0.4)]"
            />
            
            {/* Action Words */}
            <motion.div 
              style={{ opacity: impactOpacity }}
              className="absolute -top-20 -right-20"
            >
              <h4 className="text-8xl font-black italic uppercase text-[#FFD700] drop-shadow-[0_0_30px_#FFD700] tracking-tighter">
                THWIP!
              </h4>
            </motion.div>
            
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]) }}
              className="absolute -bottom-20 -left-20"
            >
              <h4 className="text-9xl font-black italic uppercase text-[#DC0000] drop-shadow-[0_0_30px_#DC0000] tracking-tighter">
                POW!
              </h4>
            </motion.div>
          </motion.div>

          {/* Impact VFX */}
          <motion.div 
            style={{ opacity: impactOpacity, scale: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.5, 2, 3]) }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
             <div className="w-[500px] h-[500px] rounded-full bg-[#FFD700]/30 blur-[100px]" />
             <div className="absolute w-full h-[2px] bg-[#FFD700] shadow-[0_0_30px_#FFD700] rotate-45" />
             <div className="absolute w-full h-[2px] bg-[#FFD700] shadow-[0_0_30px_#FFD700] -rotate-45" />
          </motion.div>

          {/* Glitch Overlay */}
          <motion.div 
            style={{ opacity: glitchOpacity }}
            className="absolute inset-0 bg-white z-[100] mix-blend-overlay pointer-events-none"
          />
        </div>

        {/* Combat Stats UI */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20">
           <div className="space-y-1">
              <span className="text-[10px] font-black text-[#00D9FF] tracking-widest uppercase">Combo Meter</span>
              <div className="flex gap-1">
                 {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={`combo-bar-${i}`} 
                      animate={{ height: i < (scrollYProgress.get() * 5) ? 20 : 8 }}
                      className="w-1 bg-[#00D9FF]" 
                    />
                 ))}
              </div>
           </div>
           <div className="space-y-1">
              <span className="text-[10px] font-black text-[#DC0000] tracking-widest uppercase">Venom Charge</span>
              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                 <motion.div style={{ width: `${scrollYProgress.get() * 100}%` }} className="h-full bg-[#DC0000]" />
              </div>
           </div>
        </div>
        
        {/* Narrative Subtitle */}
        <div className="absolute bottom-12 text-center w-full z-20">
           <motion.h4 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-white font-mono text-sm tracking-[0.5em] uppercase"
           >
             // SEQUENCE_MASTERED // THREAT_ELIMINATED
           </motion.h4>
        </div>
      </div>
    </div>
  );
};
