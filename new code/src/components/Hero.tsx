import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ParticlesBackground } from './ParticlesBackground';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

  const title = "EXPERIMENTAL";
  const subtitle = "EXPERIENCE THE FUTURE OF INTERACTIVE STORYTELLING";

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B0F1A]">
      <ParticlesBackground />
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B3FE4]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00F5FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        style={{ y: y1, opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-[#E10600]" />
            <span className="text-[10px] font-black tracking-[0.5em] text-white/60 uppercase">System Status: Active</span>
            <div className="h-px w-12 bg-[#E10600]" />
          </motion.div>

          <h1 className="flex flex-wrap justify-center text-[15vw] md:text-[12vw] font-black italic tracking-tighter leading-none uppercase select-none">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.08,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="inline-block hover:text-[#00F5FF] transition-colors duration-300"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 max-w-xl text-xs md:text-sm font-black tracking-[0.3em] text-white/40 uppercase leading-relaxed"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-12 group cursor-pointer relative"
          >
            <div className="absolute -inset-4 bg-[#00F5FF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <button className="relative px-12 py-5 bg-white text-black font-black tracking-widest uppercase hover:bg-[#E10600] hover:text-white transition-all duration-300 rounded-full">
              Initiate Sequence
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">Scroll to Discover</span>
        <div className="w-px h-16 bg-gradient-to-b from-[#00F5FF] to-transparent" />
      </motion.div>
    </section>
  );
};
