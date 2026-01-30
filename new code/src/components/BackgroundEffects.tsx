import React from 'react';
import { motion } from 'motion/react';

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Rain Effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/40 w-[1px] h-[40px]"
            initial={{ 
              top: -100, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random() 
            }}
            animate={{ 
              top: '120%',
            }}
            transition={{
              duration: Math.random() * 0.5 + 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Neon Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B11226]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00E5FF]/5 blur-[100px] rounded-full" />
      
      {/* Scanline / Grid effect overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]" />
      
      {/* Glitch Overlay (Subtle) */}
      <motion.div 
        className="absolute inset-0 bg-[#00E5FF]/5 mix-blend-overlay opacity-0"
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
      />
    </div>
  );
};
