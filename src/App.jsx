import { useState, lazy, Suspense } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import { SpeedInsights } from "@vercel/speed-insights/react";
import SplashScreen from "./components/SplashScreen";

// Lazy load heavy components
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Testimonial = lazy(() => import("./sections/Testimonial"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const LoadingFallback = () => <div className="h-20" />; // Placeholder for lazy loaded items

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onLoadComplete={handleSplashComplete} />}
      <div className="container mx-auto max-w-7xl scroll-smooth">
        <Navbar />
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Projects />
          <Experiences />
          <Testimonial />
          <Contact />
          <Footer />
        </Suspense>
      </div>
      <SpeedInsights />
    </>
  );
};

export default App;

