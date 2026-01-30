import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const InteractiveCanvasSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouse = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      const cellSize = 50;
      const rows = height / cellSize;
      const cols = width / cellSize;

      ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cellSize;
          const y = j * cellSize;
          
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300;
          
          const offsetX = dist < maxDist ? (dx / dist) * (maxDist - dist) * 0.1 : 0;
          const offsetY = dist < maxDist ? (dy / dist) * (maxDist - dist) * 0.1 : 0;

          // Drawing a small dot at intersection
          ctx.fillStyle = dist < maxDist ? `rgba(225, 6, 0, ${1 - dist/maxDist})` : 'rgba(255, 255, 255, 0.1)';
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, dist < maxDist ? 2 : 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(drawGrid);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    canvas.width = width;
    canvas.height = height;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    drawGrid();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#0B0F1A] overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 text-center pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-6 text-[#E10600] font-black tracking-[0.5em] text-xs uppercase"
        >
          Neural Mesh Interaction
        </motion.div>
        <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-none mb-8">
          BEYOND <br />
          <span className="text-[#00F5FF]">STATIC</span>
        </h2>
        <p className="max-w-md mx-auto text-gray-400 font-medium">
          The interface is alive. Every movement ripples through the underlying structure of the experience.
        </p>
      </div>

      {/* Glassmorphic info box */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="absolute bottom-12 right-12 p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl max-w-xs hidden md:block"
      >
        <div className="text-xs font-black tracking-widest text-[#00F5FF] mb-4 uppercase">Status: Reactive</div>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Our real-time canvas distortion algorithm simulates physical displacement within a virtual grid.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B0F1A] bg-gradient-to-br from-[#E10600] to-[#7B3FE4]" />
            ))}
          </div>
          <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">+40 Connected</span>
        </div>
      </motion.div>
    </section>
  );
};
