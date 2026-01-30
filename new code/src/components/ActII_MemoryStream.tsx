import React from 'react';
import { motion } from 'motion/react';

const fragments = [
  "what did we forget to remember?",
  "the space between breaths",
  "2:47 AM thoughts",
  "light through closed eyelids",
  "the taste of a color you've never seen",
  "echoes of a conversation that never happened",
  "the hum of silent machinery",
  "where do shadows go when the light dies?",
  "a memory of a future self",
  "gravity is just a lonely force"
];

export const ActII_MemoryStream = () => {
  return (
    <div className="relative h-[200vh] w-full py-40">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {fragments.map((text, i) => (
          <MemoryFragment key={i} text={text} index={i} />
        ))}
      </div>
    </div>
  );
};

const MemoryFragment = ({ text, index }: { text: string, index: number }) => {
  // Random initial positions
  const randomX = Math.random() * 80 + 10;
  const randomY = Math.random() * 80 + 10;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      style={{
        position: 'absolute',
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
      animate={{
        x: [0, Math.random() * 40 - 20, 0],
        y: [0, Math.random() * 40 - 20, 0],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="group"
    >
      <motion.p
        whileHover={{ scale: 1.1, color: '#00FFFF' }}
        className="text-xs md:text-sm font-medium text-white/30 cursor-pointer tracking-widest italic transition-all duration-700"
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.random() * 2 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
      
      {/* Hidden subtext revealed on hover */}
      <motion.div 
        className="absolute top-full left-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#9600FF]">Fragment identified</span>
      </motion.div>
    </motion.div>
  );
};
