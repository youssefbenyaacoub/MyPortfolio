import React from 'react';
import { motion } from 'motion/react';

export const ActI_Threshold = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="relative group cursor-none">
        {/* The Symbol */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          onClick={onEnter}
          className="relative z-10 w-32 h-32 flex items-center justify-center cursor-pointer"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1],
              borderColor: ['#9600FF', '#00FFFF', '#FF0066', '#9600FF']
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 rounded-full border-white/20 blur-[1px]"
          />
          
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl font-light text-white tracking-[0.2em] font-serif"
          >
            ∞
          </motion.div>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#9600FF]/10 blur-[60px] rounded-full group-hover:bg-[#00FFFF]/20 transition-all duration-1000" />
        
        {/* Hint Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-max text-[10px] tracking-[0.6em] text-white/40 uppercase"
        >
          Pierce the reality
        </motion.div>
      </div>
    </div>
  );
};
