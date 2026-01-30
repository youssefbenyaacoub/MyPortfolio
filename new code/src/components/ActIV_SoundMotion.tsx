import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ActIV_SoundMotion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      life: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        const colors = ['#00FFFF', '#9600FF', '#FF0066'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1.0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.005;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    canvas.width = width;
    canvas.height = height;
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 text-center pointer-events-none">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-white text-[10vw] font-black italic tracking-tighter opacity-10"
        >
          THE VOID LISTENS
        </motion.h2>
        <div className="mt-8 flex justify-center gap-4">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [10, Math.random() * 80 + 20, 10] }}
              transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
              className="w-1 bg-[#00FFFF]/40 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
