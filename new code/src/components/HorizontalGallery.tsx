import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const items = [
  {
    title: "VIRTUAL ARCHIVE",
    desc: "A collection of digital artifacts from the edge of reality.",
    img: "https://images.unsplash.com/photo-1709526867397-2aa7f535868f?auto=format&fit=crop&q=80&w=800",
    color: "#00F5FF"
  },
  {
    title: "NEON SYNAPSE",
    desc: "Neural networks firing at the speed of light.",
    img: "https://images.unsplash.com/photo-1761078739233-629de9252840?auto=format&fit=crop&q=80&w=800",
    color: "#E10600"
  },
  {
    title: "CYBER CORE",
    desc: "The heartbeat of a city that never sleeps.",
    img: "https://images.unsplash.com/photo-1763673263764-4d189ab2f03f?auto=format&fit=crop&q=80&w=800",
    color: "#7B3FE4"
  },
  {
    title: "DATA FRAGMENT",
    desc: "Echoes of information lost in the void.",
    img: "https://images.unsplash.com/photo-1663436835896-86203092232d?auto=format&fit=crop&q=80&w=800",
    color: "#00F5FF"
  }
];

export const HorizontalGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#05070A]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-24">
          {items.map((item, i) => (
            <div key={i} className="group relative flex-shrink-0 w-[80vw] md:w-[600px] h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-[#0B0F1A]">
              <ImageWithFallback
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <motion.span 
                  className="inline-block px-4 py-1 text-[10px] font-black tracking-widest uppercase mb-4 rounded-full border border-white/20 text-white"
                  style={{ backgroundColor: `${item.color}40`, borderColor: item.color }}
                >
                  Project 0{i + 1}
                </motion.span>
                <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4 uppercase">{item.title}</h3>
                <p className="text-gray-400 max-w-sm font-medium">{item.desc}</p>
                
                <motion.div 
                  className="mt-8 flex items-center gap-4 text-sm font-black tracking-widest uppercase text-[#00F5FF] cursor-pointer"
                  whileHover={{ x: 10 }}
                >
                  Explore Scene <span className="text-xl">→</span>
                </motion.div>
              </div>

              {/* Decorative side line */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00F5FF] to-transparent opacity-20" />
            </div>
          ))}
          
          {/* Ending Section */}
          <div className="flex-shrink-0 w-[50vw] flex flex-col justify-center items-start px-12">
            <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none mb-8">
              THE <br />
              <span className="text-[#E10600]">JOURNEY</span> <br />
              CONTINUES
            </h2>
            <button className="px-12 py-5 border-2 border-[#7B3FE4] text-[#7B3FE4] font-black tracking-widest uppercase hover:bg-[#7B3FE4] hover:text-white transition-all duration-500 rounded-full">
              VIEW ARCHIVE
            </button>
          </div>
        </motion.div>

        {/* Scroll Progress Text */}
        <div className="absolute bottom-12 right-12 flex items-baseline gap-2 font-mono text-sm">
          <span className="text-[#00F5FF]">0{Math.floor(useScroll({ target: targetRef }).scrollYProgress.get() * 3) + 1}</span>
          <span className="text-white/20">/</span>
          <span className="text-white/40">04</span>
        </div>
      </div>
    </section>
  );
};
