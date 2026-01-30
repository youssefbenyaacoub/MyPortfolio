import React from 'react';
import { motion } from 'motion/react';

export const ActV_EternalReturn = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 4 }}
        className="max-w-xl text-center px-6"
      >
        <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-12 tracking-tight">
          There is no end, only transformation.
        </h2>
        <p className="text-white/40 text-sm font-light leading-relaxed tracking-widest mb-20 uppercase">
          Your journey has left ripples in the void.<br />
          The memories remain, but the path has changed.
        </p>
        
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.1, color: '#9600FF' }}
          className="group relative px-12 py-5 text-[10px] font-black tracking-[0.8em] text-white/60 uppercase border border-white/10 rounded-full hover:border-[#9600FF] transition-all"
        >
          RE-ENTER THE VOID
          <div className="absolute inset-0 bg-[#9600FF]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
        </motion.button>
      </motion.div>
      
      <div className="absolute bottom-10 text-[8px] tracking-[0.4em] text-white/20 uppercase font-mono">
        Cycle Complete // Phase ∞
      </div>
    </div>
  );
};
