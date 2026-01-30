import { motion } from "motion/react";
import { Cpu } from "lucide-react";
import { experiences } from "../constants";
import { GlassCard, TechTag, TYPO } from "../components/NewDesignUtils";

const Experiences = () => {
  return (
    <section id="experience" className="py-32 px-8 bg-[#030412]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em]">Phase 03 / The Mission</span>
          <h2 className={`${TYPO.h2} text-4xl md:text-6xl`}>Mission Log.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full group hover:bg-cyan-400/5 hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-cyan-400 font-mono text-xs uppercase">{item.date}</span>
                    <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all">
                      <Cpu size={20} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-indigo-400 font-bold text-sm tracking-wider line-clamp-1">{item.job}</p>
                  </div>
                  <div className="space-y-2">
                    {item.contents.slice(0, 2).map((content, idx) => (
                      <p key={idx} className={`${TYPO.body} text-sm line-clamp-2 leading-tight`}>
                        • {content}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {/* Placeholder tech tags based on content or type */}
                    {i === 0 && (
                      <>
                        <TechTag text="React" />
                        <TechTag text="Node.js" />
                        <TechTag text="PHP" />
                      </>
                    )}
                    {i === 1 && <TechTag text="Degree" />}
                    {i === 2 && <TechTag text="Leadership" />}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;

