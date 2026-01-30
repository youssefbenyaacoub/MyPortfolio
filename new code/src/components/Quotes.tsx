import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

interface QuoteItem {
  text: string;
  context: string;
}

const quotes: QuoteItem[] = [
  {
    text: "We will either find a way, or make one.",
    context: "Attributed to Hannibal when facing the seemingly impossible crossing of the Alps"
  },
  {
    text: "I have come not to make war on the Italians, but to aid the Italians against Rome.",
    context: "Hannibal's proclamation upon entering Italy, attempting to rally Rome's allies"
  },
  {
    text: "Let us ease the Romans of their fears by dying.",
    context: "Hannibal's final words before taking poison to avoid Roman capture, 183 BC"
  },
  {
    text: "Hannibal is at the gates!",
    context: "Roman phrase 'Hannibal ad portas' - used for generations to describe imminent danger"
  }
];

function QuoteCard({ quote, index }: { quote: QuoteItem; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isLeft = index % 2 === 0;

  // Show/hide with directional movement
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [isLeft ? -80 : 80, 0, 0, isLeft ? 40 : -40]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.85, 1, 1, 0.9]
  );

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [isLeft ? -15 : 15, 0, 0, isLeft ? -5 : 5]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [10, 0, 0, 6]
  );

  // Quote icon rotation
  const iconRotate = useTransform(scrollYProgress, [0.1, 0.3], [90, 0]);

  return (
    <motion.div
      ref={ref}
      className="group"
      style={{
        opacity,
        x,
        scale,
        rotateY,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      <div className="relative bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-2 border-primary/20 rounded-lg p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
        {/* Stone carving effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,168,106,0.1),transparent)] rounded-lg" />
        
        {/* Animated glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        
        {/* Quote icon with rotation reveal */}
        <motion.div 
          className="absolute top-6 left-6 opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ rotate: iconRotate }}
        >
          <Quote className="w-12 h-12 text-primary" />
        </motion.div>

        <div className="relative z-10">
          {/* Quote text with character-by-character reveal */}
          <motion.blockquote className="text-xl md:text-2xl text-primary italic mb-6 leading-relaxed font-serif pl-8">
            <motion.span
              style={{
                clipPath: useTransform(
                  scrollYProgress,
                  [0.15, 0.35],
                  ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']
                )
              }}
            >
              "{quote.text}"
            </motion.span>
          </motion.blockquote>
          
          {/* Divider that grows */}
          <motion.div 
            className="h-0.5 bg-primary/30 mb-4"
            style={{
              scaleX: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]),
              transformOrigin: 'left'
            }}
          />
          
          {/* Context with fade in */}
          <motion.p 
            className="text-foreground/60 text-sm leading-relaxed"
            style={{
              opacity: useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
            }}
          >
            {quote.context}
          </motion.p>
        </div>

        {/* Decorative corner with scale animation */}
        <motion.div
          className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/20 group-hover:border-primary/40 transition-colors"
          style={{
            scale: useTransform(scrollYProgress, [0.4, 0.5], [0, 1]),
            rotate: useTransform(scrollYProgress, [0.4, 0.5], [45, 0])
          }}
        />

        {/* Engraved effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3), inset 0 -2px 10px rgba(201,168,106,0.2)'
          }}
        />
      </div>
    </motion.div>
  );
}

export function Quotes() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [0.8, 1]);

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden texture-grain">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
        >
          <div className="mb-6 flex justify-center overflow-hidden">
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                scaleX: useTransform(scrollYProgress, [0, 0.1], [0, 1])
              }}
            />
          </div>
          
          {/* Title with word-by-word reveal */}
          <h2 className="text-5xl md:text-6xl text-primary mb-4 font-serif tracking-wider">
            {['WORDS', 'OF', 'LEGEND'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mx-2"
                style={{
                  opacity: useTransform(scrollYProgress, [i * 0.03, i * 0.03 + 0.08], [0, 1]),
                  y: useTransform(scrollYProgress, [i * 0.03, i * 0.03 + 0.08], [40, 0]),
                  filter: useTransform(
                    scrollYProgress, 
                    [i * 0.03, i * 0.03 + 0.08], 
                    (v: number[]) => `blur(${v[0] * 10 - v[1] * 10}px)`
                  )
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          
          <motion.p 
            className="text-xl text-foreground/70 italic"
            style={{
              opacity: useTransform(scrollYProgress, [0.1, 0.15], [0, 1]),
              clipPath: useTransform(
                scrollYProgress,
                [0.08, 0.15],
                ['inset(0% 50% 0% 50%)', 'inset(0% 0% 0% 0%)']
              )
            }}
          >
            Carved in the Annals of History
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} index={index} />
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{
            scaleX: useTransform(scrollYProgress, [0.7, 0.85], [0, 1])
          }}
        />
      </div>
    </section>
  );
}
