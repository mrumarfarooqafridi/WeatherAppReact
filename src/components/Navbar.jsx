// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clickSound from "../assets/click.wav";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
const Navbar = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const audioRef = useRef(null);

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (section) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    }
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    }
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const navItems = [
    { key: "home", label: "Home" },
    { key: "dashboard", label: "Dashboard" },
    { key: "guide", label: "Guide" },
    { key: "pricings", label: "Pricings" },
    { key: "map", label: "Map" },
    { key: "blog", label: "Blog" },
  ];

  return (
    <motion.div
      className={`w-full p-3 lg:p-6 md:p-5 relative transition-all duration-300 ${
        isScrolled
          ? "bg-primary-900/95 backdrop-blur-md shadow-lg"
          : "bg-primary-900"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Add hidden audio element */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/click.mp3" type="audio/mpeg" />
        <source src={clickSound} type="audio/wav" />
      </audio>

      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          className="flex items-center gap-1 text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={logo} alt="" className="md:w-20 w-12" />{" "}
          <span className="md:text-xl text-lg font-bold">WEATHER WEB</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <ul className="flex gap-5 text-white cursor-pointer">
            {navItems.map((item, index) => (
              <motion.li
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                className={`font-medium transition duration-200 ${
                  activeSection === item.key
                    ? "text-secondary-400 border-b-2 border-secondary-400"
                    : "text-primary-100 hover:text-secondary-300"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <motion.div
          className="md:hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={toggleMenu}
            className="text-primary-100 p-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className="text-lg"
            />
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              ref={menuRef}
              className="md:hidden absolute top-full left-0 w-full bg-primary-800 shadow-lg z-50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Navigation Items */}
              <ul className="py-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavigation(item.key)}
                      className={`w-full text-left px-6 py-3 font-medium transition-all duration-200 border-l-4 text-[14px] ${
                        activeSection === item.key
                          ? "bg-primary-700 text-secondary-400 border-secondary-400"
                          : "text-primary-100 border-transparent hover:bg-primary-700 hover:text-secondary-300"
                      } ${
                        index !== navItems.length - 1
                          ? "border-b border-primary-600"
                          : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile Menu Footer */}
              <div className="p-4 bg-primary-900 border-t border-primary-600">
                <p className="text-primary-300 text-sm text-center">
                  Weather Web App
                </p>
              </div>
            </motion.div>

            {/* Overlay for mobile menu */}
            <motion.div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
