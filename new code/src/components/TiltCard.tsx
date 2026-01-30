import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const springConfig = { stiffness: 300, damping: 30 };
  const dx = useSpring(rotateY, springConfig);
  const dy = useSpring(rotateX, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: dx,
        rotateX: dy,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/20 to-[#7B3FE4]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-3xl" />
    </motion.div>
  );
};
