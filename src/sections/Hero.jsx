import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section id="home" className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          camera={{ position: [0, 1, 3] }}
          dpr={[1, 2]} // Performance optimization: limit resolution on high-DPI screens if needed
          gl={{ antialias: false, powerPreference: "high-performance" }} // Faster rendering
        >
          <Suspense fallback={null}>
            <Float>
              <Astronaut
                scale={isMobile && 0.23}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig />
            <AdaptiveDpr pixelated={false} />
            <AdaptiveEvents />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};


function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
