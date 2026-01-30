import { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, ChevronRight, X, ExternalLink } from "lucide-react";
import { myProjects } from "../constants";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { TYPO, TechTag } from "../components/NewDesignUtils";

const ProjectModal = memo(({ project, onClose }) => {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-[#030412]/90 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-5xl bg-[#0a0b1e] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,255,255,0.1)]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all">
          <X size={24} />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="h-[300px] md:h-full">
            <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
            <div className="space-y-2">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Project Mission</span>
              <h2 className={`${TYPO.h2} text-4xl md:text-5xl`}>{project.title}</h2>
            </div>
            <div className="space-y-4">
              <p className={`${TYPO.body} text-lg`}>{project.description}</p>
              <div className="space-y-2">
                {project.subDescription && project.subDescription.map((sub, idx) => (
                  <p key={idx} className={`${TYPO.body} text-sm text-neutral-400`}>• {sub}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => <TechTag key={tag.name || tag} text={tag.name || tag} />)}
            </div>
            <div className="pt-6 flex gap-4">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-cyan-500 text-slate-950 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors text-center"
              >
                View Repository
              </a>
              <button className="px-6 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-all">
                <ExternalLink size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

const ProjectCard = memo(({ p, i, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
    >
      <div className="w-full md:w-3/5 group cursor-pointer relative" onClick={() => onSelect(p)}>
        <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center rounded-[2rem]">
          <div className="w-16 h-16 bg-cyan-400 text-slate-950 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
            <Plus size={32} />
          </div>
        </div>
        <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
          <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
        </div>
      </div>
      <div className="w-full md:w-2/5 space-y-6">
        <div className="space-y-2">
          <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">{p.title}</h3>
          <div className="flex flex-wrap gap-2">
            {p.tags.slice(0, 3).map(t => <TechTag key={t.name || t} text={t.name || t} />)}
          </div>
        </div>
        <p className={`${TYPO.body} text-lg line-clamp-3`}>{p.description}</p>
        <button
          onClick={() => onSelect(p)}
          className="flex items-center gap-3 text-cyan-400 font-bold uppercase tracking-widest text-xs group"
        >
          Read Mission Data <ChevronRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
});

const Projects = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-32 px-8 bg-[#030412]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em]">Phase 04 / Selected Systems</span>
          <h2 className={`${TYPO.h2} text-4xl md:text-6xl`}>Active Projects.</h2>
        </div>
        <div className="space-y-24">
          {myProjects.map((p, i) => (
            <ProjectCard key={p.id || i} p={p} i={i} onSelect={setSelected} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
