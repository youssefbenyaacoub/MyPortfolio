import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface Journey {
  id: number;
  location: string;
  description: string;
  position: { x: number; y: number };
}

const journeyPoints: Journey[] = [
  { 
    id: 1, 
    location: 'Carthage', 
    description: 'Hannibal\'s homeland and starting point',
    position: { x: 48, y: 72 }
  },
  { 
    id: 2, 
    location: 'New Carthage (Spain)', 
    description: 'Departure point for the Italian campaign',
    position: { x: 35, y: 62 }
  },
  { 
    id: 3, 
    location: 'Crossing the Pyrenees', 
    description: 'First major mountain crossing',
    position: { x: 40, y: 54 }
  },
  { 
    id: 4, 
    location: 'Crossing the Alps', 
    description: 'The legendary mountain crossing with elephants',
    position: { x: 50, y: 48 }
  },
  { 
    id: 5, 
    location: 'Battle of Trebia', 
    description: 'First major victory in Italy',
    position: { x: 52, y: 46 }
  },
  { 
    id: 6, 
    location: 'Lake Trasimene', 
    description: 'Devastating ambush of Roman forces',
    position: { x: 54, y: 52 }
  },
  { 
    id: 7, 
    location: 'Cannae', 
    description: 'Greatest tactical victory in military history',
    position: { x: 62, y: 58 }
  }
];

export function MapSection({ mapImageUrl }: { mapImageUrl: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // Title animations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [0.9, 1]);

  // Map container animations
  const mapOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const mapScale = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0.95, 1, 1, 1.05]);
  const mapBlur = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [10, 0, 0, 5]);

  // Route drawing progress
  const pathLength = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  // Stats reveal
  const statsOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.6, 0.75], [30, 0]);

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30 texture-grain" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ opacity: titleOpacity, scale: titleScale }}
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
            className="text-5xl md:text-6xl text-primary mb-4 font-serif tracking-wider"
            style={{
              clipPath: useTransform(
                scrollYProgress,
                [0.05, 0.15],
                ['inset(0% 50% 0% 50%)', 'inset(0% 0% 0% 0%)']
              )
            }}
          >
            THE CAMPAIGN
          </motion.h2>
          
          <motion.p 
            className="text-xl text-foreground/70 italic"
            style={{
              opacity: useTransform(scrollYProgress, [0.1, 0.15], [0, 1])
            }}
          >
            From Carthage to the Gates of Rome
          </motion.p>
        </motion.div>

        <motion.div
          className="relative bg-card/40 backdrop-blur-sm border border-primary/20 rounded-lg p-8 overflow-hidden"
          style={{
            opacity: mapOpacity,
            scale: mapScale,
            filter: useTransform(mapBlur, (v) => `blur(${v}px)`)
          }}
        >
          {/* Map background with vertical wipe reveal */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
            <motion.div
              style={{
                clipPath: useTransform(
                  scrollYProgress,
                  [0.15, 0.35],
                  ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']
                )
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ 
                  backgroundImage: `url(${mapImageUrl})`,
                  filter: 'sepia(0.8) brightness(0.4)'
                }}
              />
            </motion.div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10" />

            {/* Animated path that draws with scroll */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9a86a" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#c9a86a" stopOpacity="1" />
                  <stop offset="100%" stopColor="#b8860b" stopOpacity="1" />
                </linearGradient>
              </defs>
              <motion.path
                d={`M ${journeyPoints.map((p, i) => 
                  `${i === 0 ? 'M' : 'L'} ${p.position.x}% ${p.position.y}%`
                ).join(' ')}`}
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 5"
                style={{ pathLength }}
                className="drop-shadow-lg"
              />
            </svg>

            {/* Journey points that appear sequentially */}
            {journeyPoints.map((point, index) => {
              const pointProgress = index / (journeyPoints.length - 1);
              const pointOpacity = useTransform(
                scrollYProgress,
                [0.2 + pointProgress * 0.4, 0.25 + pointProgress * 0.4, 0.75, 0.8],
                [0, 1, 1, 0]
              );
              const pointScale = useTransform(
                scrollYProgress,
                [0.2 + pointProgress * 0.4, 0.25 + pointProgress * 0.4],
                [0, 1]
              );

              return (
                <motion.div
                  key={point.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${point.position.x}%`,
                    top: `${point.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: pointOpacity,
                    scale: pointScale
                  }}
                  onMouseEnter={() => setSelectedPoint(point.id)}
                  onMouseLeave={() => setSelectedPoint(null)}
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                >
                  <motion.div className="relative">
                    <MapPin 
                      className="w-8 h-8 text-primary drop-shadow-lg" 
                      fill="#c9a86a"
                    />
                    
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 -m-2"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-full h-full rounded-full border-2 border-primary" />
                    </motion.div>

                    {selectedPoint === point.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-card border-2 border-primary/40 rounded-lg p-4 shadow-2xl pointer-events-none z-50"
                      >
                        <h4 className="text-primary mb-1 font-serif">{point.location}</h4>
                        <p className="text-sm text-foreground/70">{point.description}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-6 text-sm text-foreground/70"
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
            }}
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              <span>Hannibal's Route</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" fill="#c9a86a" />
              <span>Major Locations</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats with staggered reveal */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          style={{ opacity: statsOpacity, y: statsY }}
        >
          {[
            { value: '1,500+', label: 'Kilometers Traveled', delay: 0 },
            { value: '37', label: 'War Elephants', delay: 0.1 },
            { value: '15', label: 'Years in Italy', delay: 0.2 }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6 text-center group hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/10"
              style={{
                opacity: useTransform(scrollYProgress, [0.6 + stat.delay, 0.7 + stat.delay], [0, 1]),
                y: useTransform(scrollYProgress, [0.6 + stat.delay, 0.7 + stat.delay], [20, 0])
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.p 
                className="text-4xl text-primary mb-2 font-serif"
                style={{
                  clipPath: useTransform(
                    scrollYProgress,
                    [0.65 + stat.delay, 0.75 + stat.delay],
                    ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']
                  )
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
