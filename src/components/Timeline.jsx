import PropTypes from "prop-types";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ExperienceCard = ({ date, title, job, contents, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-6 transition-all duration-300 border border-white/5 rounded-2xl bg-gradient-to-br from-midnight to-indigo/30 hover:border-aqua/50 group"
    >
      <div className="flex flex-col gap-1 mb-4 md:flex-row md:items-center md:justify-between">
        <span className="px-3 py-1 text-xs font-bold uppercase rounded-full w-fit bg-aqua/10 text-aqua">
          {date}
        </span>
        <h3 className="text-xl font-bold text-white group-hover:text-aqua transition-colors">
          {job}
        </h3>
      </div>
      <h4 className="mb-4 text-lg font-medium text-neutral-300">{title}</h4>
      <ul className="space-y-3">
        {contents.map((content, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-aqua shrink-0" />
            {content}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export const Timeline = ({ data }) => {
  return (
    <div className="c-space section-spacing">
      <div className="flex flex-col gap-4 mb-20">
        <h2 className="text-heading">My Work Experience</h2>
        <p className="max-w-xl subtext">
          A journey through the roles and projects that have shaped my professional growth.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <ExperienceCard key={index} {...item} index={index} />
        ))}
      </div>
    </div>
  );
};

Timeline.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      title: PropTypes.string,
      job: PropTypes.string,
      contents: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
