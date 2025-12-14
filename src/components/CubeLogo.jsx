import { motion } from "motion/react";

const CubeLogo = ({ className = "w-8 h-8" }) => {
  return (
    <motion.div
      className={`${className} relative`}
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Top Left */}
        <div className="absolute w-1/2 h-1/2 border border-aqua bg-black/50 top-0 left-0" />
        {/* Top Right */}
        <div className="absolute w-1/2 h-1/2 border border-aqua bg-black/70 top-0 right-0" />
        {/* Bottom Left */}
        <div className="absolute w-1/2 h-1/2 border border-aqua bg-black/60 bottom-0 left-0" />
        {/* Bottom Right */}
        <div className="absolute w-1/2 h-1/2 border border-aqua bg-black/80 bottom-0 right-0" />
      </div>
    </motion.div>
  );
};

export default CubeLogo;
