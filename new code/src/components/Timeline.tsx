import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Swords, Mountain, Crown, Skull } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const events: TimelineEvent[] = [
  {
    year: '247 BC',
    title: 'Birth in Carthage',
    description: 'Born to Hamilcar Barca, a prominent Carthaginian general during the First Punic War.',
    icon: <Crown className="w-6 h-6" />
  },
  {
    year: '218 BC',
    title: 'Crossing the Alps',
    description: 'Led his army of 50,000 infantry, 9,000 cavalry, and 37 war elephants across the treacherous Alps into Italy.',
    icon: <Mountain className="w-6 h-6" />
  },
  {
    year: '216 BC',
    title: 'Battle of Cannae',
    description: 'Achieved one of history\'s greatest tactical victories, encircling and destroying a Roman army twice his size.',
    icon: <Swords className="w-6 h-6" />
  },
  {
    year: '202 BC',
    title: 'Battle of Zama',
    description: 'Defeated by Scipio Africanus, ending the Second Punic War and Carthaginian dominance.',
    icon: <Swords className="w-6 h-6" />
  },
  {
    year: '183 BC',
    title: 'Death in Exile',
    description: 'Took his own life in Bithynia to avoid capture by Rome, ending a legendary life.',
    icon: <Skull className="w-6 h-6" />
  }
];

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isLeft = index % 2 === 0;
  
  // Show/hide based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
  
  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [isLeft ? -100 : 100, 0, 0, isLeft ? 50 : -50]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.9]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [10, 0, 0, 5]
  );

  return (
    <div ref={ref} className={`flex gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center mb-16`}>
      <motion.div 
        className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}
        style={{ 
          opacity,
          x,
          scale,
          filter: useTransform(blur, (v) => `blur(${v}px)`)
        }}
      >
        <div className="bg-card/50 backdrop-blur-sm p-6 rounded border border-primary/20 hover:border-primary/40 transition-colors hover:shadow-xl hover:shadow-primary/10 group">
          <motion.p 
            className="text-primary text-2xl mb-2 font-serif tracking-wide"
            style={{
              opacity: useTransform(scrollYProgress, [0.2, 0.35], [0, 1])
            }}
          >
            {event.year}
          </motion.p>
          <motion.h3 
            className="text-xl mb-3 text-foreground"
            style={{
              opacity: useTransform(scrollYProgress, [0.25, 0.4], [0, 1])
            }}
          >
            {event.title}
          </motion.h3>
          <motion.p 
            className="text-foreground/70 leading-relaxed"
            style={{
              opacity: useTransform(scrollYProgress, [0.3, 0.45], [0, 1])
            }}
          >
            {event.description}
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className="relative flex-shrink-0"
        style={{ scale }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 relative group"
          style={{ opacity }}
          whileHover={{ 
            scale: 1.2,
            boxShadow: '0 0 30px rgba(201, 168, 106, 0.6)',
            transition: { duration: 0.3 }
          }}
        >
          {event.icon}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-30"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      </motion.div>

      <div className="flex-1" />
    </div>
  );
}

export function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -30]);
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden texture-grain">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div className="mb-6 flex justify-center overflow-hidden">
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                scaleX: useTransform(scrollYProgress, [0, 0.15], [0, 1])
              }}
            />
          </div>
          <motion.h2 
            className="text-5xl md:text-6xl text-primary mb-4 font-serif tracking-wider"
            style={{
              clipPath: useTransform(
                scrollYProgress,
                [0, 0.15],
                ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']
              )
            }}
          >
            TIMELINE
          </motion.h2>
          <motion.p 
            className="text-xl text-foreground/70 italic"
            style={{
              opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1])
            }}
          >
            A Journey Through History
          </motion.p>
        </motion.div>

        {/* Vertical line with scroll reveal */}
        <motion.div 
          className="absolute left-1/2 top-48 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2"
          style={{ 
            height: lineHeight,
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
          }}
        />

        <div className="relative">
          {events.map((event, index) => (
            <TimelineItem key={event.year} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
