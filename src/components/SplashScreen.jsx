import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SplashScreen = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadComplete();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Simple Loading Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-gray-700 border-t-aqua rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default SplashScreen;
