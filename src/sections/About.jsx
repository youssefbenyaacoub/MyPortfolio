import { motion } from "motion/react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { TYPO } from "../components/NewDesignUtils";

const timelineEvents = [
  {
    year: "2019 - 2023",
    title: "The Foundation",
    desc: "Completed Baccalaureate in Economy & Management, sparked interest in systems and logic.",
    color: "#B11226",
  },
  {
    year: "2023 - PRESENT",
    title: "Digital Deep Dive",
    desc: "Enrolled in Computer Science for Management at ESEN, mastering the art of full-stack development.",
    color: "#00E5FF",
  },
  {
    year: "2024 - BEYOND",
    title: "Building the Future",
    desc: "Creating high-impact web applications and exploring the cutting edge of tech ecosystems.",
    color: "#B11226",
  },
];

const About = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-32 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em]">Phase 01 / Origin Story</span>
          <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-12 uppercase leading-none text-white">
            MY <br />
            <span className="text-cyan-400">JOURNEY</span>
          </h3>

          <div className="space-y-12 relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-600 to-transparent hidden md:block" />

            {timelineEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative pl-0 md:pl-16 group"
              >
                <div
                  className="absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-[#030412] z-10 hidden md:flex items-center justify-center transition-colors duration-300 bg-cyan-500"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-8 hover:border-cyan-400/40 transition-all duration-300 group-hover:translate-x-2 rounded-2xl">
                  <span className="text-xs font-black tracking-widest text-cyan-400 mb-2 block">{event.year}</span>
                  <h4 className="text-2xl font-black mb-4 uppercase italic tracking-tight text-white">{event.title}</h4>
                  <p className="text-gray-400 leading-relaxed font-['Inter',sans-serif]">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 to-indigo-600/20 blur-2xl rounded-3xl" />
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5] border border-white/10 group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1625685554446-9c0dc87d506a?auto=format&fit=crop&q=80&w=1080"
              alt="Origin Story"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030412] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[2px] w-12 bg-cyan-400" />
                <span className="text-xs font-black tracking-widest text-cyan-400">YOUSSEF.DEV DATA</span>
              </div>
              <h4 className="text-3xl font-black italic uppercase text-white">Subject: Ben Yaacoub, Y.</h4>
            </div>
          </div>

          {/* Floating UI Element */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 w-48 p-4 bg-black/80 backdrop-blur-md border border-cyan-400/50 text-[10px] font-mono leading-tight z-20 hidden md:block"
          >
            <div className="text-cyan-400 mb-2 border-b border-cyan-400/20 pb-1 uppercase">Analysis active</div>
            <div className="text-white/60">
              STR: 85/100<br />
              AGL: 92/100<br />
              INT: 95/100<br />
              SENSE: TRIGGERED
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

