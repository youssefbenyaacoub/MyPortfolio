import { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Tech from "./sections/Tech";
import Footer from "./sections/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";
import SplashScreen from "./components/SplashScreen";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030412; }
        ::-webkit-scrollbar-thumb { background: #1a1b2e; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #00FFFF; }
      `}</style>
      {showSplash && <SplashScreen onLoadComplete={handleSplashComplete} />}
      <div className="bg-[#030412] text-white selection:bg-cyan-500/30 selection:text-cyan-400 overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Tech />
          <div className="container mx-auto max-w-7xl scroll-smooth">
            <Projects />
            <Experiences />
            <Testimonial />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
      <SpeedInsights />
    </>
  );
};


export default App;


