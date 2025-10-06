import React, { useState } from "react";
import {
  faSearch,
  faMap,
  faChartBar,
  faHome,
  faQuestionCircle,
  faDownload,
  faCode,
  faMobileAlt,
  faShieldAlt,
  faRocket,
  faBook,
  faChevronDown,
  faChevronUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import clickSound from "../assets/click.wav";

const Guide = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [openFaq, setOpenFaq] = useState(null);

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch((e) => console.log("Click sound failed:", e));
  };

  const handleNavigation = (section) => {
    playClickSound();
    setActiveSection(section);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const navigationItems = [
    { id: "getting-started", label: "Getting Started", icon: faRocket },
    { id: "features", label: "Features Guide", icon: faChartBar },
    { id: "api", label: "API Usage", icon: faCode },
    { id: "mobile", label: "Mobile App", icon: faMobileAlt },
    { id: "troubleshooting", label: "Troubleshooting", icon: faShieldAlt },
    { id: "faq", label: "FAQ", icon: faQuestionCircle },
  ];

  const features = [
    {
      icon: faHome,
      title: "Home Dashboard",
      description:
        "Quick access to current weather conditions and basic forecasts",
      tips: [
        "Check the temperature and conditions at a glance",
        "View sunrise and sunset times",
        "Monitor humidity and wind conditions",
      ],
    },
    {
      icon: faChartBar,
      title: "Weather Dashboard",
      description: "Comprehensive weather analytics and detailed metrics",
      tips: [
        "Track temperature trends over time",
        "Monitor precipitation probability",
        "View detailed atmospheric pressure data",
      ],
    },
    {
      icon: faMap,
      title: "Interactive Maps",
      description: "Visual weather data with multiple layer options",
      tips: [
        "Switch between temperature and precipitation layers",
        "Zoom in for local weather patterns",
        "Use the map for trip planning",
      ],
    },
    {
      icon: faSearch,
      title: "Search Functionality",
      description: "Find weather information for any location worldwide",
      tips: [
        "Search by city name or postal code",
        "Use country codes for precise results",
        "Save favorite locations for quick access",
      ],
    },
  ];

  const faqItems = [
    {
      question: "How often is the weather data updated?",
      answer:
        "Our weather data updates every 15 minutes from reliable sources including OpenWeatherMap and other meteorological services.",
    },
    {
      question: "Can I use this data for commercial applications?",
      answer:
        "Yes, our API supports commercial use. Please check our pricing page for commercial licensing details and rate limits.",
    },
    {
      question: "How accurate are the weather forecasts?",
      answer:
        "Our 5-day forecasts have an accuracy of over 85%, while hourly forecasts are typically 90%+ accurate for the first 24 hours.",
    },
    {
      question: "Do you provide historical weather data?",
      answer:
        "Yes, we offer historical weather data up to 5 years back. This feature is available in our premium plans.",
    },
    {
      question: "How do I integrate the weather API into my application?",
      answer:
        "We provide comprehensive API documentation with code examples in multiple programming languages. Check our API documentation section.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, our mobile app is available for both iOS and Android devices, offering all web features with push notifications for severe weather alerts.",
    },
  ];

  const apiExamples = [
    {
      language: "JavaScript",
      code: `// Get current weather
fetch('https://api.weatherapp.com/v1/current?city=London&key=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => console.log(data));`,
    },
    {
      language: "Python",
      code: `import requests

response = requests.get(
    "https://api.weatherapp.com/v1/current",
    params={"city": "London", "key": "YOUR_API_KEY"}
)
data = response.json()`,
    },
    {
      language: "cURL",
      code: `curl -X GET \\
  "https://api.weatherapp.com/v1/current?city=London&key=YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    },
  ];

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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-primary-900 mb-4">
            Weather Web App Guide
          </h1>
          <p className="text-lg md:text-xl text-primary-700 max-w-3xl mx-auto">
            Your comprehensive guide to using all features of our weather
            application. Learn how to get the most accurate weather data and
            forecasts.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-primary-100 sticky top-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-6 border-b border-primary-100">
                <h2 className="text-xl font-bold text-primary-900">
                  Guide Sections
                </h2>
              </div>
              <nav className="md:p-4 p-2">
                <ul className="md:space-y-2 space-y-1">
                  {navigationItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <motion.button
                        onClick={() => handleNavigation(item.id)}
                        className={`w-full text-left md:px-4 px-2 md:py-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                          activeSection === item.id
                            ? "bg-primary-600 text-white shadow-md"
                            : "text-primary-700 hover:bg-primary-50 hover:text-primary-900"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FontAwesomeIcon icon={item.icon} className="text-lg" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Getting Started Section */}
            <AnimatePresence mode="wait">
              {activeSection === "getting-started" && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg border border-primary-100 md:p-8 p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center">
                    <FontAwesomeIcon
                      icon={faRocket}
                      className="mr-3 text-primary-600"
                    />
                    Getting Started
                  </h2>

                  <div className="space-y-6">
                    <motion.div
                      className="bg-primary-50 rounded-lg md:p-6 p-3 border border-primary-200"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="md:text-xl text-sm font-semibold text-primary-800 mb-3">
                        Welcome to Weather Web!
                      </h3>
                      <p className="text-primary-700 leading-relaxed md:text-sm text-xs">
                        Our platform provides comprehensive weather data and
                        forecasts to help you make informed decisions. Follow
                        this guide to explore all features.
                      </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          icon: faSearch,
                          color: "primary",
                          step: "1. Search Location",
                          desc: "Enter any city name to get started",
                        },
                        {
                          icon: faChartBar,
                          color: "secondary",
                          step: "2. Explore Data",
                          desc: "View detailed weather metrics and forecasts",
                        },
                        {
                          icon: faMap,
                          color: "accent",
                          step: "3. Use Maps",
                          desc: "Visualize weather patterns on interactive maps",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="text-center p-6 bg-white border border-primary-200 rounded-lg hover:shadow-md transition-all duration-300"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          whileHover={{
                            scale: 1.05,
                            y: -5,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div
                            className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                          >
                            <FontAwesomeIcon
                              icon={item.icon}
                              className={`text-${item.color}-600 text-2xl`}
                            />
                          </div>
                          <h4 className="font-semibold text-primary-800 mb-2">
                            {item.step}
                          </h4>
                          <p className="text-primary-600 text-sm">
                            {item.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="md:text-xl text-lg font-semibold mb-3">
                        Pro Tip
                      </h3>
                      <p className="leading-relaxed md:text-sm text-xs">
                        Bookmark your frequently searched locations for instant
                        access to weather updates. You can save up to 10
                        favorite locations in your profile.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Features Guide Section */}
              {activeSection === "features" && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg border border-primary-100 md:p-8 p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center">
                    <FontAwesomeIcon
                      icon={faChartBar}
                      className="mr-3 text-primary-600"
                    />
                    Features Guide
                  </h2>

                  <motion.div
                    className="md:space-y-8 space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="border border-primary-200 rounded-lg md:p-6 p-3 hover:shadow-md transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          borderColor: "rgb(192, 38, 211)",
                          boxShadow: "0 10px 25px -5px rgba(192, 38, 211, 0.1)",
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <motion.div
                            className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <FontAwesomeIcon
                              icon={feature.icon}
                              className="text-primary-600 text-xl"
                            />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-primary-800 mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-primary-700 mb-4 md:text-lg text-sm">
                              {feature.description}
                            </p>
                            <motion.div
                              className="bg-primary-50 rounded-lg p-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <h4 className="font-semibold text-primary-800 mb-2 md:text-lg text-sm">
                                Usage Tips:
                              </h4>
                              <ul className="space-y-2">
                                {feature.tips.map((tip, tipIndex) => (
                                  <motion.li
                                    key={tipIndex}
                                    className="flex items-start text-primary-700 md:text-sm text-xs"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + tipIndex * 0.1 }}
                                  >
                                    <span className="text-accent-500 mr-2">
                                      •
                                    </span>
                                    {tip}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* API Usage Section */}
              {activeSection === "api" && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg border border-primary-100 md:p-8 p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center">
                    <FontAwesomeIcon
                      icon={faCode}
                      className="mr-3 text-primary-600"
                    />
                    API Usage Guide
                  </h2>

                  <div className="space-y-6">
                    <motion.div
                      className="bg-primary-50 rounded-lg p-6 border border-primary-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="md:text-xl text-lg font-semibold text-primary-800 mb-3">
                        Getting Your API Key
                      </h3>
                      <p className="text-primary-700 mb-4 md:text-sm text-xs">
                        Sign up for a free account to get your API key. Free
                        tier includes 1,000 requests per day.
                      </p>
                      <motion.button
                        onClick={playClickSound}
                        className="bg-secondary-600 text-white px-6 py-2 rounded-lg hover:bg-secondary-700 transition-colors font-medium shadow-lg"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(192, 38, 211, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get API Key
                      </motion.button>
                    </motion.div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-primary-800">
                        Code Examples
                      </h3>
                      {apiExamples.map((example, index) => (
                        <motion.div
                          key={index}
                          className="border border-primary-200 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="bg-primary-800 text-white px-4 py-2">
                            <h4 className="font-mono font-semibold">
                              {example.language}
                            </h4>
                          </div>
                          <pre className="bg-gray-900 text-green-400 md:p-4 p-2 md:text-sm text-xs overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* FAQ Section */}
              {activeSection === "faq" && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg border border-primary-100 md:p-8 p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="md:text-2xl text-md font-bold text-primary-900 mb-6 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faQuestionCircle}
                      className="m-auto text-primary-600"
                    />
                    Frequently Asked Questions
                  </h2>

                  <motion.div
                    className="md:space-y-4 space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {faqItems.map((faq, index) => (
                      <motion.div
                        key={index}
                        className="border border-primary-200 rounded-lg overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ borderColor: "rgb(6, 182, 212)" }}
                      >
                        <motion.button
                          onClick={() => toggleFaq(index)}
                          className="w-full text-left md:p-6 p-3 bg-white hover:bg-primary-50 transition-colors flex justify-between items-center"
                          whileHover={{
                            backgroundColor: "rgba(6, 182, 212, 0.05)",
                          }}
                          whileTap={{ scale: 0.995 }}
                        >
                          <span className="font-semibold text-primary-800 md:text-lg text-xs">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: openFaq === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FontAwesomeIcon
                              icon={
                                openFaq === index ? faChevronUp : faChevronDown
                              }
                              className="text-primary-600"
                            />
                          </motion.div>
                        </motion.button>
                        <AnimatePresence>
                          {openFaq === index && (
                            <motion.div
                              className="p-6 bg-primary-50 border-t border-primary-200"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="text-primary-700 leading-relaxed md:text-sm text-xs">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Mobile App Section */}
              {activeSection === "mobile" && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg border border-primary-100 md:p-8 p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="md:text-2xl text-xl font-bold text-primary-900 mb-6 flex items-center">
                    <FontAwesomeIcon
                      icon={faMobileAlt}
                      className="mr-3 text-primary-600"
                    />
                    Mobile App Guide
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="md:space-y-6 space-y-2">
                      <h3 className="md:text-xl text-lg font-semibold text-primary-800">
                        App Features
                      </h3>
                      <ul className="md:space-y-3 space-y-1">
                        {[
                          "Push notifications for severe weather",
                          "Offline access to saved locations",
                          "Widget support for home screen",
                          "Dark mode support",
                        ].map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center text-primary-700 md:text-sm text-xs"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-secondary-500 mr-3"
                            />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex space-x-4">
                        <motion.button
                          onClick={playClickSound}
                          className="flex-1 bg-primary-600 text-white md:py-3 py-1 rounded-lg hover:bg-primary-700 transition-colors font-semibold ms:text-sm text-xs shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            className="text-white mr-2"
                          />
                          Download for iOS
                        </motion.button>
                        <motion.button
                          onClick={playClickSound}
                          className="flex-1 bg-secondary-600 text-white md:py-3 py-1 rounded-lg hover:bg-secondary-700 transition-colors font-semibold ms:text-sm text-xs shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            className="text-white mr-2"
                          />
                          Download for Android
                        </motion.button>
                      </div>
                    </div>

                    <motion.div
                      className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl md:p-6 p-3 text-white"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="md:text-xl text-lg font-semibold mb-4">
                        Mobile Exclusive
                      </h3>
                      <p className="leading-relaxed mb-4 md:text-sm text-xs">
                        Get real-time weather alerts and radar updates directly
                        on your mobile device. Perfect for travelers and outdoor
                        enthusiasts.
                      </p>
                      <div className="text-sm opacity-90">
                        <strong>Available features:</strong> Live radar, storm
                        tracking, and personalized weather notifications.
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Troubleshooting Section */}
              {activeSection === "troubleshooting" && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg border border-primary-100 md:p-8 p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="md:text-2xl text-lg font-bold text-primary-900 mb-6 flex items-center">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-primary-600"
                    />
                    Troubleshooting Guide
                  </h2>

                  <div className="md:space-y-6 space-y-2">
                    <motion.div
                      className="bg-accent-50 border border-accent-200 rounded-lg p-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="md:text-xl text-lg font-semibold text-accent-800 mb-3">
                        Common Issues
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            issue: "Location not found",
                            solution:
                              "Try using the city name with country code (e.g., 'London, UK')",
                          },
                          {
                            issue: "Data not loading",
                            solution:
                              "Check your internet connection and refresh the page",
                          },
                          {
                            issue: "Map not displaying",
                            solution:
                              "Ensure your browser allows JavaScript and check for ad blockers",
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            <h4 className="font-semibold text-accent-700 md:text-lg text-sm">
                              {item.issue}
                            </h4>
                            <p className="text-accent-600 md:text-sm text-xs">
                              {item.solution}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-primary-50 border border-primary-200 rounded-lg md:p-6 p-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="md:text-xl text-sm font-semibold text-primary-800 mb-3">
                        Need More Help?
                      </h3>
                      <p className="text-primary-700 mb-4 text-xs md:text-sm">
                        Our support team is available 24/7 to help you with any
                        issues.
                      </p>
                      <div className="flex space-x-4">
                        <motion.button
                          onClick={playClickSound}
                          className="bg-primary-600 text-white md:px-6 px-2 md:py-2 py-1 rounded-lg hover:bg-primary-700 transition-colors md:text-sm text-xs shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Contact Support
                        </motion.button>
                        <motion.button
                          onClick={playClickSound}
                          className="border border-primary-600 text-primary-600 md:px-6 px-2 md:py-2 py-1 rounded-lg hover:bg-primary-50 md:text-sm text-xs transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Live Chat
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Help Bar */}
        <motion.div
          className="mt-12 bg-white rounded-xl shadow-lg border border-primary-100 p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="md:text-lg text-sm font-semibold text-primary-800">
                Still need help?
              </h3>
              <p className="text-primary-600 md:text-lg text-xs">
                Our support team is ready to assist you
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <motion.button
                onClick={playClickSound}
                className="bg-primary-600 text-white md:px-6 px-2 md:py-2 py-1 rounded-lg hover:bg-primary-700 transition-colors md:font-medium md:text-lg text-xs shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
              <motion.button
                onClick={playClickSound}
                className="border border-primary-600 text-primary-600 md:px-6 px-2 md:py-2 py-1 rounded-lg hover:bg-primary-50 transition-colors md:font-medium md:text-lg text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-primary-800 mr-2"
                />
                View Documentation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Guide;
