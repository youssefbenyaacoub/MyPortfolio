import React, { useState, useEffect, Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { TYPO } from "../components/NewDesignUtils";
import { Astronaut } from "../components/Astronaut";

// Memoized 3D Scene to prevent re-renders when text changes
const HeroVisuals = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="relative hidden md:block h-[500px]"
    >
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 1, 3] }}
          dpr={1} // Set to 1 for better performance, especially on high-dpi screens
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            alpha: true
          }}
        >
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Astronaut scale={0.25} position={[0, -1, 0]} active={true} />
            </Float>
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
      {/* Decorative Elements - Move these into the memoized component too */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-cyan-400/10 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square border border-indigo-400/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
    </motion.div>
  );
});

const Hero = () => {
  const words = ["Scalable", "Modern", "Secure", "Infinite"];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setWordIdx(p => (p + 1) % words.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center px-8 md:px-20 overflow-hidden">
      {/* Background Starfield */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1767188789485-54e0922d76a8"
          alt="Deep Space"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030412]/50 to-[#030412]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Full-Stack Developer</span>
          </motion.div>

          <div className="space-y-4">
            <h1 className={`${TYPO.h1} text-[10vw] md:text-8xl text-white`}>Building</h1>
            <AnimatePresence mode="wait">
              <motion.h1
                key={words[wordIdx]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`${TYPO.h1} text-[10vw] md:text-8xl text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]`}
              >
                {words[wordIdx]}
              </motion.h1>
            </AnimatePresence>
            <h1 className={`${TYPO.h1} text-[10vw] md:text-8xl text-white`}>Ecosystems.</h1>
          </div>

          <p className={`${TYPO.body} text-lg md:text-xl max-w-lg`}>
            Navigating the digital void to architect high-performance, immersive web environments with precision and cosmic-scale infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,255,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-cyan-500 text-slate-950 font-black rounded-2xl uppercase tracking-widest text-xs inline-block"
            >
              Initiate Mission
            </motion.a>
            <a
              href="#projects"
              className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.2em] group transition-all hover:text-cyan-400"
            >
              Explore Log <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>

        <HeroVisuals />
      </div>
    </section>
  );
};

export default Hero;
