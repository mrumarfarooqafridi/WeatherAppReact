// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Typewriter from "typewriter-effect";
import thunderVideo from "../assets/backFix.mp4";
import Audio1 from "../assets/thunderstorm.wav";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ activeSection, setActiveSection }) => {
  const [thunderEffect, setThunderEffect] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [hasPlayedSound, setHasPlayedSound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const thunderAudioRef = useRef(null);

  // Fade in animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle user interaction to enable audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  // Thunder sound - only play once after user interaction
  useEffect(() => {
    if (hasUserInteracted && thunderAudioRef.current && !hasPlayedSound) {
      thunderAudioRef.current.volume = 1.0;
      thunderAudioRef.current
        .play()
        .then(() => {
          console.log("Thunder audio played successfully");
          setHasPlayedSound(true);
        })
        .catch((e) => console.log("Thunder audio play failed:", e));
    }
  }, [hasUserInteracted, hasPlayedSound]);

  // Slower thunder effect every 8 seconds with more gradual flashes
  useEffect(() => {
    const interval = setInterval(() => {
      const flashSequence = [
        { delay: 0, duration: 400 },
        { delay: 600, duration: 150 },
        { delay: 1000, duration: 300 },
        { delay: 1500, duration: 200 },
      ];

      flashSequence.forEach((flash) => {
        setTimeout(() => {
          setThunderEffect(true);
          setTimeout(() => {
            setThunderEffect(false);
          }, flash.duration);
        }, flash.delay);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Audio element with preload */}
      <audio ref={thunderAudioRef} preload="auto" loop={false}>
        <source src={Audio1} type="audio/wav" />
        <source src={Audio1} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        {/* Thunder Effect Overlay - Animated */}
        <AnimatePresence>
          {thunderEffect && (
            <motion.div
              className="absolute inset-0 bg-accent-400 bg-opacity-20 z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Video background for large/medium screens */}
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 object-cover w-full h-full hidden md:block"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <source src={thunderVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        {/* Background Image - ONLY show on small screens - WITH thunder effect */}
        <motion.img
          src="/src/assets/HeaderBack.avif"
          alt="Header Background"
          className={`absolute inset-0 object-cover w-full h-full md:hidden ${
            thunderEffect
              ? "brightness-150 contrast-110 scale-[1.02]"
              : "brightness-95 contrast-100 scale-100"
          }`}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Gradient overlay for better text readability */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary-900/60 to-primary-800/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Content */}
        <div className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <h1 className="flex items-center justify-center md:text-4xl text-2xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
              <Typewriter
                options={{
                  strings: ["Sky Cast", "Weather Wise", "Clima View"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-sm md:text-xl max-w-2xl drop-shadow-lg text-primary-100">
              {activeSection === "home"
                ? "Weather forecasts, nowcasts and history in a fast and elegant way."
                : "Interactive weather maps with real-time data and multiple layers."}
            </p>
          </motion.div>

          {/* Animated scroll indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-secondary-400 rounded-full flex justify-center"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1 h-3 bg-secondary-400 rounded-full mt-2"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-secondary-500 rounded-full blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-accent-500 rounded-full blur-lg opacity-25"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.15, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </motion.div>
  );
};

export default Header;
