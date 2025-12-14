import PropTypes from "prop-types";
import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={closeModal}
    >
      <motion.div
        className="relative max-w-lg w-11/12 sm:w-auto border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 max-h-[80vh] overflow-y-auto custom-scrollbar"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500"
        >
          <img src="assets/close.svg" className="w-6 h-6" />
        </button>
        <img src={image} alt={title} className="w-full rounded-t-2xl" />
        <div className="p-4 sm:p-5">
          <h5 className="mb-2 text-xl sm:text-2xl font-bold text-white">{title}</h5>
          <p className="mb-2 text-sm sm:text-base font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc) => (
            <p key={subDesc} className="mb-2 text-sm sm:text-base font-normal text-neutral-400">{subDesc}</p>
          ))}
          <div className="flex items-center justify-between mt-3 gap-2">
            <div className="flex gap-2">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-8 hover-animation"
                />
              ))}
            </div>
            <a 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium cursor-pointer hover-animation hover:text-aqua transition-colors"
            >
              View Project{" "}
              <img src="assets/arrow-up.svg" className="size-3" alt="open" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

ProjectDetails.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subDescription: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      path: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  href: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default ProjectDetails;
