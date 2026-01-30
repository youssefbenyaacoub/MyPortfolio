import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ActIII_MorphingGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const blobs = [
    { color: '#9600FF', delay: 0 },
    { color: '#FF0066', delay: 2 },
    { color: '#00FFFF', delay: 4 },
    { color: '#FFD700', delay: 6 },
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#050505]/40">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.h2 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) }}
          className="absolute top-20 text-[10px] tracking-[1em] text-white/20 uppercase"
        >
          Form is temporary
        </motion.h2>

        <div className="relative w-full h-full flex items-center justify-center">
          {blobs.map((blob, i) => (
            <MorphingBlob 
              key={i} 
              index={i} 
              color={blob.color} 
              scrollProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MorphingBlob = ({ index, color, scrollProgress }: { index: number, color: string, scrollProgress: any }) => {
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [0.5 + index * 0.1, 1.5, 0.8]);
  const rotate = useTransform(scrollProgress, [0, 1], [0, 360]);
  const x = useTransform(scrollProgress, [0, 1], [index % 2 === 0 ? -200 : 200, 0]);
  const y = useTransform(scrollProgress, [0, 1], [index < 2 ? -200 : 200, 0]);

  return (
    <motion.div
      style={{
        scale,
        rotate,
        x,
        y,
        position: 'absolute',
      }}
      className="w-64 h-64 md:w-96 md:h-96 pointer-events-auto group"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full filter blur-[10px]">
        <defs>
          <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path
          animate={{
            d: [
              "M45,-62C58,-54,67,-38,71,-21C75,-4,74,14,67,30C60,46,47,60,31,68C15,76,-4,78,-21,72C-38,66,-53,52,-62,35C-71,18,-74,-1,-69,-18C-64,-35,-51,-50,-36,-58C-21,-66,-4,-67,13,-69C30,-71,45,-62,45,-62Z",
              "M35,-50C48,-41,63,-34,69,-22C75,-10,72,6,66,20C60,34,51,46,38,55C25,64,3,70,-17,66C-37,62,-55,48,-64,30C-73,12,-73,-10,-65,-28C-57,-46,-41,-60,-25,-68C-9,-76,7,-78,21,-72C35,-66,35,-50,35,-50Z",
              "M45,-62C58,-54,67,-38,71,-21C75,-4,74,14,67,30C60,46,47,60,31,68C15,76,-4,78,-21,72C-38,66,-53,52,-62,35C-71,18,-74,-1,-69,-18C-64,-35,-51,-50,-36,-58C-21,-66,-4,-67,13,-69C30,-71,45,-62,45,-62Z"
            ]
          }}
          transition={{
            duration: 10 + index,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill={`url(#grad-${index})`}
          transform="translate(100 100)"
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
         <span className="text-[10px] font-black text-white/40 tracking-[0.5em] uppercase">Core Data</span>
      </div>
    </motion.div>
  );
};
