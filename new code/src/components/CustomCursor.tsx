import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';

export const CustomCursor = ({ act }: { act: number }) => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isClicking, setIsClicking] = useState(false);
  const [isStill, setIsStill] = useState(false);
  const stillTimer = useRef<number | null>(null);

  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsStill(false);
      if (stillTimer.current) window.clearTimeout(stillTimer.current);
      stillTimer.current = window.setTimeout(() => setIsStill(true), 3000);
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [mouseX, mouseY]);

  const cursorSize = isClicking ? 80 : isStill ? 0 : 40;
  const color = act === 3 ? '#FF0066' : act === 4 ? '#00FFFF' : '#9600FF';

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer Ring */}
      <motion.div
        className="absolute w-10 h-10 border border-white/20 rounded-full flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorSize,
          height: cursorSize,
          borderColor: color,
        }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <motion.div 
          className="w-1 h-1 bg-white rounded-full"
          animate={{ scale: isClicking ? 4 : 1 }}
        />
      </motion.div>

      {/* Trailing Glow */}
      <motion.div
        className="absolute w-32 h-32 blur-3xl opacity-20 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: color,
        }}
      />
      
      {/* Dimensional Rift (on click) */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute w-20 h-20 border-2 border-white rounded-full"
            style={{
              x: mouseX.get(),
              y: mouseY.get(),
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
