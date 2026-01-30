import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Scroll, Shield, Swords } from 'lucide-react';

export function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <footer ref={ref} className="relative py-16 px-6 border-t border-primary/20 texture-grain overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
      
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201, 168, 106, 0.5) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          y: useTransform(scrollYProgress, [0, 1], [0, -20])
        }}
      />
      
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto"
        style={{ opacity, y, scale }}
      >
        {/* Decorative icons */}
        <div className="flex justify-center gap-8 mb-8">
          {[Shield, Swords, Shield].map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 0.4 + (i === 1 ? 0.2 : 0), rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ 
                scale: 1.2, 
                opacity: 0.8,
                rotateZ: i === 1 ? 0 : 10,
                transition: { duration: 0.3 }
              }}
            >
              <Icon className={`w-8 h-8 text-primary/${i === 1 ? '60' : '40'}`} />
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="text-center space-y-6">
          <motion.h3 
            className="text-3xl text-primary font-serif tracking-wider"
            style={{
              clipPath: useTransform(
                scrollYProgress,
                [0.2, 0.4],
                ['inset(0% 50% 0% 50%)', 'inset(0% 0% 0% 0%)']
              )
            }}
          >
            HANNIBAL BARCA
          </motion.h3>
          
          <motion.p 
            className="text-foreground/60 italic text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            247 BC - 183 BC
          </motion.p>

          <motion.p 
            className="text-foreground/50 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            This tribute website celebrates one of history's greatest military commanders. 
            Hannibal's tactical brilliance and unwavering determination continue to inspire 
            military strategists and leaders worldwide.
          </motion.p>

          <motion.div 
            className="pt-8 border-t border-primary/20 mt-8"
            style={{
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
            }}
          >
            <p className="text-sm text-foreground/40">
              © 2026 A Historical Tribute • Educational Purpose
            </p>
          </motion.div>
        </div>

        {/* Decorative scroll icon */}
        <motion.div
          className="flex justify-center mt-8"
          animate={{ 
            rotateZ: [0, 5, -5, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut"
          }}
          whileHover={{ 
            scale: 1.2,
            rotateZ: 0,
            transition: { duration: 0.2 }
          }}
        >
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 0.3])
            }}
          >
            <Scroll className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
