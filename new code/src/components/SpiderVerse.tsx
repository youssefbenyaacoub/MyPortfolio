import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const spiders = [
  {
    name: "PETER PARKER",
    universe: "EARTH-616",
    img: "https://images.unsplash.com/photo-1696680510620-90e35fe7a128?auto=format&fit=crop&q=80&w=800",
    color: "#B11226"
  },
  {
    name: "MILES MORALES",
    universe: "EARTH-1610",
    img: "https://images.unsplash.com/photo-1548206269-5b8fcd4765bb?auto=format&fit=crop&q=80&w=800",
    color: "#00E5FF"
  },
  {
    name: "SPIDER-GWEN",
    universe: "EARTH-65",
    img: "https://images.unsplash.com/photo-1719777068188-f259e61dcdaa?auto=format&fit=crop&q=80&w=800",
    color: "#FF3399"
  },
  {
    name: "SPIDER-MAN 2099",
    universe: "EARTH-928",
    img: "https://images.unsplash.com/photo-1623679971411-7b7d672bca5b?auto=format&fit=crop&q=80&w=800",
    color: "#B11226"
  }
];

export const SpiderVerse = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Animated Background Text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full flex flex-col pointer-events-none opacity-10">
          <motion.h2 
            style={{ x: useTransform(scrollYProgress, [0, 1], [0, -500]) }}
            className="text-[20vw] font-black italic tracking-tighter whitespace-nowrap leading-none"
          >
            INTO THE SPIDER-VERSE
          </motion.h2>
          <motion.h2 
            style={{ x: useTransform(scrollYProgress, [0, 1], [0, 500]) }}
            className="text-[20vw] font-black italic tracking-tighter whitespace-nowrap leading-none text-right"
          >
            INTO THE SPIDER-VERSE
          </motion.h2>
        </div>

        <div className="relative px-6 md:px-20 mb-12">
          <h2 className="text-[#00E5FF] font-mono tracking-widest text-sm mb-4 uppercase">Multi-Dimensional Sync</h2>
          <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
            ANYONE CAN WEAR <br />
            <span className="text-[#B11226]">THE MASK</span>
          </h3>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-20">
          {spiders.map((spider, i) => (
            <motion.div
              key={i}
              className="relative min-w-[400px] h-[500px] rounded-3xl overflow-hidden group border border-white/10"
              whileHover={{ y: -20, scale: 1.02 }}
            >
              <ImageWithFallback
                src={spider.img}
                alt={spider.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <span className="text-xs font-black tracking-widest mb-2" style={{ color: spider.color }}>{spider.universe}</span>
                <h4 className="text-4xl font-black italic uppercase leading-tight mb-4">{spider.name}</h4>
                <div className="h-1 w-12 bg-white/20 group-hover:w-full group-hover:bg-[#00E5FF] transition-all duration-500" />
              </div>

              {/* Glitch Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[#00E5FF] mix-blend-color" />
              </div>
            </motion.div>
          ))}
          
          {/* More spacer */}
          <div className="min-w-[400px] flex items-center justify-center border-4 border-dashed border-white/5 rounded-3xl">
             <span className="text-gray-600 font-black italic text-3xl uppercase tracking-tighter opacity-40">More to discover...</span>
          </div>
        </motion.div>

        {/* Scroll Progress within section */}
        <div className="absolute bottom-10 left-20 right-20 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollYProgress }} 
            className="absolute inset-0 bg-[#00E5FF] origin-left"
          />
        </div>
      </div>
    </div>
  );
};
