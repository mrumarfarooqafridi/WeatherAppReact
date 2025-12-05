// Footer.jsx
import React from "react";
import Anchor from "./Anchor";
import { motion } from "framer-motion";
import twitter from "../assets/brandimages/microsoft.png";
import facebook from "../assets/brandimages/netflix.png";
import linkedin from "../assets/brandimages/nvidia.png";
import youtube from "../assets/brandimages/samsung.png";
import downloadPng from "../assets/Download.png";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col bg-primary-900 lg:px-20 lg:py-14 md:px-16 md:py-8 text-white px-8 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="flex flex-col" variants={itemVariants}>
          <p className="md:text-lg text-xs font-bold text-primary-100 mb-4">
            Product
          </p>
          <div className="space-y-2">
            <Anchor text="Overview" href="Hello.com" />
            <Anchor text="Features" href="Hello.com" />
            <Anchor text="Solutions" href="Hello.com" />
            <Anchor text="Tutorials" href="Hello.com" />
          </div>
        </motion.div>

        <motion.div className="flex flex-col" variants={itemVariants}>
          <p className="md:text-lg text-xs font-bold text-primary-100 mb-4">
            Company
          </p>
          <div className="space-y-2">
            <Anchor text="About us" href="Hello.com" />
            <Anchor text="Careers" href="Hello.com" />
            <Anchor text="News" href="Hello.com" />
          </div>
        </motion.div>

        <motion.div className="flex flex-col" variants={itemVariants}>
          <p className="md:text-lg text-xs font-bold text-primary-100 mb-4">
            Resources
          </p>
          <div className="space-y-2">
            <Anchor text="Blog" href="Hello.com" />
            <Anchor text="Newsletter" href="Hello.com" />
            <Anchor text="Events" href="Hello.com" />
            <Anchor text="Help Center" href="Hello.com" />
          </div>
        </motion.div>
        {/*  */}
        <motion.div
          className="flex flex-col justify-end"
          variants={itemVariants}
        >
          <img
            className="cursor-pointer"
            src={downloadPng}
            alt="Download PNG"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p className="md:text-lg text-xs font-bold text-primary-100 mb-3">
          About Us
        </p>
        <motion.p
          className="md:text-sm text-[10px] text-primary-200 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          OpenWeather provides weather data for any location on the globe using
          a proprietary ML-powered hyperlocal forecasting model with resolution
          from 500 m to 2 km, globally. While we started as an ethical,
          non-profit project run by a team of people passionate in making high-
          quality climate insights more open to the world, these days we focus
          on complex, enterprise-grade commercial projects.
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-8 flex flex-col md:flex-row justify-between items-center pt-6 border-t border-primary-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="flex flex-col md:text-md text-xs mb-4 md:mb-0"
          whileHover={{ x: 5 }}
        >
          <motion.p
            className="text-[8px] md:text-lg font-bold text-primary-100"
            whileHover={{ color: "rgb(192, 38, 211)" }}
          >
            Weather Web
          </motion.p>
          <p className="text-[6px] md:text-[14px] text-primary-300">
            © All Copy Rights reserved
          </p>
        </motion.div>

        <motion.div
          className="flex md:flex-row gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { src: twitter, alt: "Twitter", delay: 0 },
            { src: facebook, alt: "Facebook", delay: 0.1 },
            { src: youtube, alt: "YouTube", delay: 0.2 },
            { src: linkedin, alt: "LinkedIn", delay: 0.3 },
          ].map((social, index) => (
            <motion.div key={social.alt} variants={itemVariants} custom={index}>
              <motion.img
                src={social.src}
                alt={social.alt}
                className="md:w-20 md:h-10 w-16 h-8 cursor-pointer transition-all duration-300 filter grayscale hover:grayscale-0"
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  filter: "grayscale(0%)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating background elements */}
      <motion.div
        className="absolute left-10 bottom-20 w-12 h-12 bg-secondary-800 rounded-full blur-xl opacity-20 -z-10"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-20 bottom-40 w-8 h-8 bg-accent-800 rounded-full blur-lg opacity-30 -z-10"
        animate={{
          y: [0, 8, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
};

export default Footer;
