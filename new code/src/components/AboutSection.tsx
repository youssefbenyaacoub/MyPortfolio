import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text = "We create immersive digital experiences that blur the line between reality and simulation. Our mission is to push the boundaries of what's possible on the web, combining cutting-edge technology with cinematic art direction.";
  const words = text.split(" ");

  const yImage = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-48 px-6 md:px-24 bg-[#0B0F1A] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-[#00F5FF] font-black tracking-widest uppercase text-xs">01 // THE VISION</span>
            <div className="h-px w-24 bg-[#00F5FF]/30" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-12">
            REDEFINING THE <br />
            <span className="text-[#7B3FE4]">DIGITAL BORDER</span>
          </h2>

          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = (i + 1) / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </div>
        </div>

        <motion.div 
          style={{ y: yImage, opacity }}
          className="relative aspect-square"
        >
          <div className="absolute -inset-4 border border-[#00F5FF]/20 rounded-[3rem] rotate-3" />
          <div className="absolute -inset-4 border border-[#E10600]/20 rounded-[3rem] -rotate-3" />
          
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1663436835896-86203092232d?auto=format&fit=crop&q=80&w=1080"
              alt="Futuristic Portrait"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7B3FE4]/40 via-transparent to-transparent mix-blend-overlay" />
            
            {/* Floating UI element */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-12 right-12 p-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-[#E10600] rounded-full animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Analyzing Stream</span>
              </div>
              <div className="text-2xl font-black italic uppercase text-white">88.4 FPS</div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <motion.span 
      style={{ opacity, y }}
      className="text-lg md:text-2xl font-medium text-white inline-block"
    >
      {children}
    </motion.span>
  );
};
