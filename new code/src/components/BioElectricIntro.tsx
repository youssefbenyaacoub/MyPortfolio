import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const BioElectricIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),  // Surge starts
      setTimeout(() => setPhase(2), 1500), // Mask appears
      setTimeout(() => setPhase(3), 2500), // Logo slam
      setTimeout(() => onComplete(), 4500) // Finish
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
    >
      {/* Bio-Electric Surge */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`surge-line-${i}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: Math.random() }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <motion.path
                    d={`M50,50 L${Math.random() * 100},${Math.random() * 100}`}
                    stroke={i % 2 === 0 ? "#00D9FF" : "#FFD700"}
                    strokeWidth="0.5"
                    fill="none"
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mask and Logo */}
      <div className="relative z-10 text-center">
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="mb-8"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative group">
                <img 
                  src="https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&q=80&w=500" 
                  alt="Miles Mask" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(220,0,0,0.5)]"
                />
                <motion.div 
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 bg-[#00D9FF]/20 mix-blend-overlay rounded-full blur-2xl"
                />
              </div>
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none text-white drop-shadow-2xl">
                SPIDER-MAN<br />
                <span className="text-[#DC0000]">MILES MORALES</span>
              </h1>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-1 bg-[#00D9FF] mt-4 mx-auto w-32 origin-center"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Charge up particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`intro-particle-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1.5, 0],
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
            className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-[#00D9FF]' : 'bg-[#FFD700]'}`}
          />
        ))}
      </div>
    </motion.div>
  );
};
