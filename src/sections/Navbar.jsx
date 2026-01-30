import { useState } from "react";
import { motion } from "motion/react";

function Navigation() {
  return (
    <ul className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
      <li>
        <a
          className="text-base font-medium text-neutral-300 hover:text-aqua transition-colors duration-300 relative group"
          href="#home"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aqua group-hover:w-full transition-all duration-300"></span>
        </a>
      </li>
      <li>
        <a
          className="text-base font-medium text-neutral-300 hover:text-aqua transition-colors duration-300 relative group"
          href="#about"
        >
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aqua group-hover:w-full transition-all duration-300"></span>
        </a>
      </li>

      <li>
        <a
          className="text-base font-medium text-neutral-300 hover:text-aqua transition-colors duration-300 relative group"
          href="#tech"
        >
          Stack
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aqua group-hover:w-full transition-all duration-300"></span>
        </a>
      </li>
      <li>
        <a
          className="text-base font-medium text-neutral-300 hover:text-aqua transition-colors duration-300 relative group"
          href="#projects"
        >
          Projects
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aqua group-hover:w-full transition-all duration-300"></span>
        </a>
      </li>
      <li>
        <a
          className="text-base font-medium text-neutral-300 hover:text-aqua transition-colors duration-300 relative group"
          href="#experience"
        >
          Work
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aqua group-hover:w-full transition-all duration-300"></span>
        </a>
      </li>
      <li>
        <a
          className="text-base font-medium text-neutral-300 hover:text-aqua transition-colors duration-300 relative group"
          href="#contact"
        >
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aqua group-hover:w-full transition-all duration-300"></span>
        </a>
      </li>

    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-20 w-full hidden sm:flex items-center justify-center pt-4 pointer-events-none">
      <motion.div
        className="bg-black/20 backdrop-blur-md border border-aqua/20 rounded-full px-8 py-4 pointer-events-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer text-neutral-400 hover:text-aqua focus:outline-none sm:hidden"
        >
          <img
            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
            className="w-6 h-6"
            alt="toggle"
          />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden sm:flex">
          <Navigation />
        </nav>

        {/* Mobile navigation */}
        {isOpen && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/20 backdrop-blur-md border border-aqua/20 rounded-3xl px-8 py-6 sm:hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <nav>
              <Navigation />
            </nav>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Navbar;
