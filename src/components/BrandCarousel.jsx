// BrandCarousel.jsx
import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import logo1 from "../assets/brandimages/addidas.png";
import logo2 from "../assets/brandimages/amazon.png";
import logo3 from "../assets/brandimages/bca.png";
import logo4 from "../assets/brandimages/flyemirates.png";
import logo5 from "../assets/brandimages/googlepay.png";
import logo6 from "../assets//brandimages/huawei.png";
import logo7 from "../assets/brandimages/intel.png";
import logo8 from "../assets/brandimages/lonovo.png";
import logo9 from "../assets/brandimages/iphone.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9];

export default function BrandCarousel() {
  return (
    <motion.div
      className="w-full bg-gradient-to-r from-primary-50 to-secondary-50 py-10 border-y border-primary-100"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <motion.h3
          className="text-xl font-semibold text-primary-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Trusted by Industry Leaders
        </motion.h3>
        <motion.p
          className="text-primary-600 text-sm max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Partnered with the world's most innovative companies
        </motion.p>
      </div>

      <Marquee
        gradient={true}
        gradientColor={[236, 254, 255]} // primary-50 color
        gradientWidth={100}
        speed={50}
        pauseOnHover={true}
        direction="left"
        autoFill={true}
        className="py-4"
      >
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            className="mx-8 flex items-center"
            whileHover={{
              scale: 1.15,
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <motion.img
              src={logo}
              alt={`Brand Logo ${index + 1}`}
              className="md:h-16 h-10 w-auto object-contain opacity-70 hover:opacity-100 filter grayscale hover:grayscale-0 transition-all duration-500"
              whileHover={{
                filter: "grayscale(0%)",
                opacity: 1,
              }}
            />
          </motion.div>
        ))}
      </Marquee>

      {/* Animated background elements */}
      <motion.div
        className="absolute left-10 top-1/2 w-8 h-8 bg-secondary-200 rounded-full blur-lg opacity-40 -z-10"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-20 top-1/3 w-6 h-6 bg-accent-200 rounded-full blur-md opacity-30 -z-10"
        animate={{
          y: [0, 10, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
}
