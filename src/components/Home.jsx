// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  faShieldAlt,
  faGlobe,
  faRocket,
  faChartLine,
  faMobileAlt,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clickSound from "../assets/click.wav";

const Home = () => {
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch((e) => console.log("Click sound failed:", e));
  };

  // Animation variants
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: faShieldAlt,
      title: "Enterprise-Grade Reliability",
      description:
        "99.9% uptime with redundant systems and real-time monitoring",
    },
    {
      icon: faGlobe,
      title: "Global Coverage",
      description: "Accurate weather data for every location worldwide",
    },
    {
      icon: faRocket,
      title: "Lightning Fast API",
      description: "Response times under 50ms for critical applications",
    },
    {
      icon: faChartLine,
      title: "Advanced Analytics",
      description: "Historical data and predictive modeling capabilities",
    },
    {
      icon: faMobileAlt,
      title: "Mobile Optimized",
      description: "Seamless integration with iOS and Android applications",
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      description: "Dedicated technical support team always available",
    },
  ];

  const stats = [
    { number: "50M+", label: "Daily API Requests" },
    { number: "200K+", label: "Active Developers" },
    { number: "99.9%", label: "Uptime SLA" },
    { number: "150+", label: "Countries Served" },
  ];

  return (
    <motion.div
      className="px-4 md:px-10 py-8 w-full mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-xl md:text-3xl font-bold text-primary-800 mb-4"
          variants={itemVariants}
        >
          Fast Weather Data Access
        </motion.h2>
        <motion.p
          className="text-xs md:text-lg text-gray-700 mb-6 leading-relaxed max-w-4xl mx-auto"
          variants={itemVariants}
        >
          We provide reliable, easy-to-use weather products, supporting millions
          of developers around the clock. Our solutions are designed to fit a
          wide range of applications, from simple projects to{" "}
          <motion.a
            href="https://en.wikipedia.org/wiki/Complex_enterprise_system"
            className="text-secondary-600 hover:text-secondary-800 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playClickSound}
          >
            complex enterprise systems.
          </motion.a>
        </motion.p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-4 bg-primary-50 rounded-lg border border-primary-100 shadow-sm"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={playClickSound}
          >
            <div className="text-lg md:text-2xl font-bold text-primary-700">
              {stat.number}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <div className="mb-12">
        <motion.h3
          className="text-lg md:text-2xl font-bold text-primary-800 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Our Platform?
        </motion.h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                borderColor: "rgb(192, 38, 211)",
                boxShadow:
                  "0 20px 25px -5px rgba(192, 38, 211, 0.1), 0 10px 10px -5px rgba(192, 38, 211, 0.04)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={playClickSound}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <motion.div
                    className="p-3 rounded-full bg-secondary-50"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className="text-secondary-500 text-lg md:text-xl"
                    />
                  </motion.div>
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-primary-800 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Core Features List */}
      <div className="mb-12">
        <motion.h3
          className="text-lg md:text-2xl font-bold text-primary-800 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Comprehensive Weather Solutions
        </motion.h3>
        <motion.ul
          className="space-y-2 mb-6 text-xs md:text-lg text-gray-700"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            "A spectrum of ready-to-use weather products",
            "Short-term and long-term forecasts, history and observation",
            "Any location on the globe",
            "Transparent pricing and licensing",
            "Real-time severe weather alerts and notifications",
            "Customizable data formats (JSON, XML, CSV)",
          ].map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              variants={slideInLeft}
              whileHover={{ x: 10 }}
              onClick={playClickSound}
            >
              <motion.span
                className="text-accent-500 mr-3 mt-1"
                whileHover={{ scale: 1.5 }}
              >
                •
              </motion.span>
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* API Integration Section */}
      <motion.div
        className="bg-primary-50 rounded-xl p-6 mb-12 border border-primary-100 shadow-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scaleIn}
      >
        <motion.h3
          className="text-lg md:text-2xl font-bold text-primary-800 mb-4"
          variants={itemVariants}
        >
          Easy Integration
        </motion.h3>
        <motion.p
          className="text-xs md:text-lg text-gray-700 mb-6 leading-relaxed"
          variants={itemVariants}
        >
          Our weather products are accessible through fast, reliable{" "}
          <motion.a
            href="https://en.wikipedia.org/wiki/API"
            className="text-accent-600 hover:text-accent-800 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playClickSound}
          >
            APIs
          </motion.a>{" "}
          that meet industry standards and integrate with various enterprise
          systems. They include essential climate data for any location, along
          with specialized products for weather-sensitive industries, like the
          Road Risk API and{" "}
          <motion.a
            href="https://en.wikipedia.org/wiki/Solar_power_forecasting"
            className="text-accent-600 hover:text-accent-800 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playClickSound}
          >
            Solar Panel Energy Prediction.
          </motion.a>
        </motion.p>
        <motion.div
          className="bg-white rounded-lg p-4 border border-primary-200"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.1)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={playClickSound}
        >
          <code className="text-xs flex w-full overflow-auto md:text-sm text-primary-800">
            {`// Get current weather data\nfetch('https://api.weatherapp.com/v1/current?city=London&key=YOUR_API_KEY')\n  .then(response => response.json())\n  .then(data => console.log(data));`}
          </code>
        </motion.div>
      </motion.div>

      {/* Industry Applications */}
      <div className="mb-12">
        <motion.h3
          className="text-lg md:text-2xl font-bold text-primary-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted By Industries Worldwide
        </motion.h3>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            "Agriculture",
            "Transportation",
            "Energy",
            "Retail",
            "Tourism",
            "Insurance",
            "Events",
            "Construction",
          ].map((industry, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#f0fdfa",
                borderColor: "rgb(192, 38, 211)",
                color: "rgb(192, 38, 211)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={playClickSound}
            >
              <span className="text-xs md:text-sm font-medium text-primary-800">
                {industry}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-200 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
      >
        <motion.h3
          className="text-lg md:text-2xl font-bold text-primary-800 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Ready to Get Started?
        </motion.h3>
        <motion.p
          className="text-xs md:text-lg text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Join thousands of developers and businesses who trust our weather data
          for their critical applications.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={playClickSound}
            className="bg-secondary-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-secondary-700 transition duration-200 text-lg shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(192, 38, 211, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </motion.button>
          <motion.button
            onClick={playClickSound}
            className="bg-white text-primary-800 font-semibold py-3 px-8 rounded-lg border border-primary-300 hover:bg-primary-50 transition duration-200 text-lg"
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(6, 182, 212)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Documentation
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating background elements */}
      <motion.div
        className="absolute left-10 top-1/4 w-16 h-16 bg-secondary-200 rounded-full blur-xl opacity-30 -z-10"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-20 bottom-1/4 w-12 h-12 bg-accent-200 rounded-full blur-lg opacity-40 -z-10"
        animate={{
          y: [0, 15, 0],
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

export default Home;
