import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Shield, Brain, Swords, Award } from 'lucide-react';

interface BiographySection {
  title: string;
  icon: React.ReactNode;
  content: string[];
  image?: string;
}

const sections: BiographySection[] = [
  {
    title: 'Early Life',
    icon: <Shield className="w-8 h-8" />,
    content: [
      'Hannibal Barca was born in 247 BC in Carthage, into one of the most powerful families of the Carthaginian Empire. His father, Hamilcar Barca, was a brilliant general who commanded Carthaginian forces in the First Punic War against Rome.',
      'Legend tells that at the age of nine, Hannibal accompanied his father to Spain. Before departing, Hamilcar made young Hannibal swear an oath at the altar, declaring eternal enmity against Rome. This oath would shape the course of Hannibal\'s entire life.',
      'Growing up in a military environment, Hannibal received an exceptional education in military tactics, strategy, and leadership. He learned Greek and was tutored by Spartans, absorbing knowledge from multiple cultures that would later inform his innovative military strategies.'
    ]
  },
  {
    title: 'Military Genius',
    icon: <Brain className="w-8 h-8" />,
    content: [
      'Hannibal is widely considered one of history\'s greatest military tacticians. His innovative strategies and tactical brilliance have been studied in military academies for over two millennia.',
      'His use of terrain, understanding of enemy psychology, and ability to coordinate complex troop movements set him apart. The double envelopment maneuver he perfected at Cannae remains a masterclass in tactical execution.',
      'Beyond tactics, Hannibal demonstrated exceptional leadership, maintaining a multi-ethnic mercenary army\'s loyalty through years of campaigning in hostile territory. His soldiers followed him through impossible odds, testament to his charisma and strategic vision.'
    ]
  },
  {
    title: 'Famous Battles',
    icon: <Swords className="w-8 h-8" />,
    content: [
      'The Battle of Cannae (216 BC) stands as Hannibal\'s masterpiece. Facing a Roman army of 86,000 against his 50,000, he deliberately allowed his center to fall back while his cavalry defeated the Roman horse. Then, in a perfectly executed double envelopment, his forces surrounded and annihilated the Roman legions. An estimated 50,000-70,000 Romans died that day.',
      'His crossing of the Alps with war elephants in 218 BC remains one of history\'s most audacious military achievements. Despite losing nearly half his army and most elephants to the harsh mountain conditions, Hannibal emerged in Italy and began his devastating campaign.',
      'At the Battle of Trebia and Lake Trasimene, Hannibal demonstrated his mastery of ambush tactics and psychological warfare, consistently outmaneuvering larger Roman forces through superior strategy and intimate knowledge of terrain.'
    ]
  },
  {
    title: 'Legacy',
    icon: <Award className="w-8 h-8" />,
    content: [
      'Though ultimately defeated at Zama and forced into exile, Hannibal\'s impact on military history cannot be overstated. His strategies are still taught in military academies worldwide, and his name has become synonymous with brilliant generalship.',
      'Rome, despite winning the war, never forgot the terror Hannibal brought to their gates. For generations, Roman parents would quiet children with the phrase "Hannibal ad portas" - "Hannibal is at the gates."',
      'Military commanders from Napoleon to Norman Schwarzkopf have studied Hannibal\'s campaigns. His influence extends beyond military affairs into leadership theory, strategic thinking, and the understanding that victory requires both tactical brilliance and strategic vision.'
    ]
  }
];

function BiographyCard({ section, index }: { section: BiographySection; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Show/hide animations
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [-100, 0, 0, -50]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.95]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [8, 0, 0, 4]
  );

  // Icon animations
  const iconRotate = useTransform(scrollYProgress, [0.1, 0.3], [180, 0]);
  const iconScale = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="mb-16"
      style={{
        opacity,
        x,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`)
      }}
    >
      <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group relative overflow-hidden">
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(201, 168, 106, 0.1), transparent 70%)'
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary"
              style={{ 
                rotate: iconRotate,
                scale: iconScale
              }}
            >
              {section.icon}
            </motion.div>
            
            {/* Title with clip reveal */}
            <motion.h3 
              className="text-3xl text-primary font-serif tracking-wide"
              style={{
                clipPath: useTransform(
                  scrollYProgress,
                  [0.15, 0.3],
                  ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']
                )
              }}
            >
              {section.title}
            </motion.h3>
          </div>

          <div className="space-y-4">
            {section.content.map((paragraph, idx) => (
              <motion.p
                key={idx}
                className="text-foreground/80 leading-relaxed text-lg relative overflow-hidden"
                style={{
                  clipPath: useTransform(
                    scrollYProgress,
                    [0.2 + idx * 0.05, 0.35 + idx * 0.05],
                    ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']
                  )
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Decorative corner that animates in */}
        <motion.div
          className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/20"
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]),
            scale: useTransform(scrollYProgress, [0.3, 0.4], [0.5, 1])
          }}
        />
      </div>
    </motion.div>
  );
}

export function Biography() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background texture-grain" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div className="mb-6 flex justify-center overflow-hidden">
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                scaleX: useTransform(scrollYProgress, [0, 0.1], [0, 1])
              }}
            />
          </div>
          
          <motion.h2 
            className="text-5xl md:text-6xl text-primary mb-4 font-serif tracking-wider overflow-hidden"
          >
            {['THE', 'MAN', '&', 'THE', 'MYTH'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mx-2"
                style={{
                  opacity: useTransform(scrollYProgress, [i * 0.02, i * 0.02 + 0.1], [0, 1]),
                  y: useTransform(scrollYProgress, [i * 0.02, i * 0.02 + 0.1], [30, 0])
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-foreground/70 italic"
            style={{
              opacity: useTransform(scrollYProgress, [0.08, 0.15], [0, 1])
            }}
          >
            Sworn Enemy of Rome, Master of War
          </motion.p>
        </motion.div>

        {sections.map((section, index) => (
          <BiographyCard key={section.title} section={section} index={index} />
        ))}
      </div>
    </section>
  );
}
