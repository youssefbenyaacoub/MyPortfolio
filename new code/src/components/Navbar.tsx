import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Zap, Layers, Cpu } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 ${
        scrolled ? 'py-4 bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/10' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-[#E10600] rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Zap className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">EXPERIMENTAL</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-12">
            {['PROCESS', 'PROJECTS', 'LAB', 'CONTACT'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-xs font-black tracking-[0.3em] uppercase hover:text-[#00F5FF] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E10600] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:border-[#00F5FF] transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0B0F1A] z-[90] flex items-center justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full max-w-7xl mx-auto px-12 items-center">
              <div className="space-y-8">
                {['HOME', 'WORKS', 'ABOUT', 'RESOURCES', 'SOCIETY'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="overflow-hidden group"
                  >
                    <a 
                      href="#" 
                      className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase inline-block hover:text-[#00F5FF] hover:translate-x-4 transition-all duration-500"
                    >
                      {item}
                    </a>
                  </motion.div>
                ))}
              </div>
              
              <div className="hidden md:flex flex-col gap-12 pl-24 border-l border-white/10">
                <div className="space-y-4">
                  <h4 className="text-[#E10600] font-black tracking-widest uppercase text-sm">Headquarters</h4>
                  <p className="text-gray-400 font-medium">1024 Pixel Plaza<br />Neo-Saito City, 44021</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[#00F5FF] font-black tracking-widest uppercase text-sm">Transmission</h4>
                  <p className="text-gray-400 font-medium italic">hello@experimental.io<br />+44 (0) 99 22 11</p>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Globe className="w-5 h-5" /></div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Cpu className="w-5 h-5" /></div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Zap className="w-5 h-5" /></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
