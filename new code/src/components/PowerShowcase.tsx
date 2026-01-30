import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Zap, Eye, Ghost, Sparkles } from 'lucide-react';

export const PowerShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [hoveredSide, setHoveredSide] = useState<'venom' | 'camouflage' | null>(null);

  // Charge level based on scroll
  const charge = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const glowOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-black overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row">
        
        {/* LEFT SIDE: VENOM STRIKE */}
        <motion.div 
          onMouseEnter={() => setHoveredSide('venom')}
          onMouseLeave={() => setHoveredSide(null)}
          className="relative flex-1 group cursor-pointer border-r border-white/5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#FFD700]/5 group-hover:bg-[#FFD700]/10 transition-colors duration-700" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
            <motion.div 
              animate={{ 
                scale: hoveredSide === 'venom' ? 1.1 : 1,
                rotate: hoveredSide === 'venom' ? [0, -2, 2, 0] : 0
              }}
              className="w-20 h-20 rounded-2xl bg-[#FFD700]/20 flex items-center justify-center mb-8 border border-[#FFD700]/40 shadow-[0_0_30px_rgba(255,215,0,0.2)]"
            >
              <Zap className="w-10 h-10 text-[#FFD700] fill-current" />
            </motion.div>
            
            <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
              VENOM <span className="text-[#FFD700]">STRIKE</span>
            </h3>
            <p className="max-w-xs text-gray-400 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Unleash explosive bio-electric energy that stuns enemies and destroys obstacles.
            </p>
          </div>

          {/* Electric Arcs Background */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
             <ImageWithFallback 
               src="https://images.unsplash.com/photo-1609619385076-36a873425636?auto=format&fit=crop&q=80&w=1080" 
               alt="Electric Energy" 
               className="w-full h-full object-cover mix-blend-screen"
             />
          </div>

          {/* Scrolling Charge Indicator */}
          <div className="absolute bottom-12 left-12 right-12">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div style={{ width: `${charge.get()}%` }} className="h-full bg-[#FFD700] shadow-[0_0_20px_#FFD700]" />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: CAMOUFLAGE */}
        <motion.div 
          onMouseEnter={() => setHoveredSide('camouflage')}
          onMouseLeave={() => setHoveredSide(null)}
          className="relative flex-1 group cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#00D9FF]/5 group-hover:bg-[#00D9FF]/10 transition-colors duration-700" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
            <motion.div 
              animate={{ 
                scale: hoveredSide === 'camouflage' ? 1.1 : 1,
                opacity: hoveredSide === 'camouflage' ? [1, 0.4, 1] : 1
              }}
              className="w-20 h-20 rounded-2xl bg-[#00D9FF]/20 flex items-center justify-center mb-8 border border-[#00D9FF]/40 shadow-[0_0_30px_rgba(0,217,255,0.2)]"
            >
              <Ghost className="w-10 h-10 text-[#00D9FF]" />
            </motion.div>
            
            <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
              ACTIVE <span className="text-[#00D9FF]">CAMO</span>
            </h3>
            <p className="max-w-xs text-gray-400 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Bend light around you to become nearly invisible, perfect for stealth takedowns.
            </p>
          </div>

          {/* Hologram Shader Placeholder */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <ImageWithFallback 
               src="https://images.unsplash.com/photo-1679485205984-4ce35c32b2d6?auto=format&fit=crop&q=80&w=1080" 
               alt="Stealth UI" 
               className="w-full h-full object-cover mix-blend-color-dodge"
             />
          </div>

          {/* Glitch Effect on Hover */}
          <motion.div 
            animate={{ 
              opacity: hoveredSide === 'camouflage' ? [0, 0.2, 0] : 0 
            }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
          />
        </motion.div>

        {/* Center Vertical Divider (Interactive) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-20 hidden md:block" />
      </div>
      
      {/* Scroll Unlock Message */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center"
      >
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-white mx-auto mb-4 animate-pulse" />
          <h4 className="text-2xl font-black italic uppercase tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            POWERS FULLY CHARGED
          </h4>
        </div>
      </motion.div>
    </div>
  );
};
