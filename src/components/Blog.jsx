import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faArrowRight,
  faSearch,
  faTags,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import clickSound from "../assets/click.wav";

const playClickSound = () => {
  const audio = new Audio(clickSound);
  audio.play().catch((e) => console.log("Click sound failed:", e));
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

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

  const cardHover = {
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Climate Change: Impacts on Weather Patterns",
      excerpt:
        "Explore how climate change is reshaping global weather systems and what it means for future forecasts.",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "climate",
      image: "/src/assets/post1.png",
      featured: true,
    },
    {
      id: 2,
      title: "The Science Behind Hurricane Formation and Tracking",
      excerpt:
        "Dive into the meteorological processes that create hurricanes and how modern technology helps track them.",
      author: "Michael Rodriguez",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "storms",
      image: "/src/assets/hurrican.jpg",
      featured: true,
    },
    {
      id: 3,
      title: "Winter Weather Preparedness: Your Complete Guide",
      excerpt:
        "Essential tips and tools to prepare for extreme winter conditions and stay safe during snowstorms.",
      author: "Emily Watson",
      date: "2024-01-10",
      readTime: "5 min read",
      category: "safety",
      image: "/src/assets/winterpreparedness.jpg",
    },
    {
      id: 4,
      title: "How AI is Revolutionizing Weather Prediction",
      excerpt:
        "Discover how artificial intelligence and machine learning are making weather forecasts more accurate than ever.",
      author: "Dr. James Kim",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "technology",
      image: "/src/assets/AIinWeather.jpg",
    },
    {
      id: 5,
      title: "The Beauty of Cloud Formations: A Photographer's Guide",
      excerpt:
        "Learn to identify different cloud types and capture stunning weather photography.",
      author: "Lisa Thompson",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "education",
      image: "/src/assets/cloud.jpg",
    },
    {
      id: 6,
      title: "Extreme Heat Waves: Urban Planning and Adaptation",
      excerpt:
        "How cities worldwide are adapting infrastructure to combat rising temperatures and heat islands.",
      author: "Robert Green",
      date: "2024-01-03",
      readTime: "7 min read",
      category: "climate",
      image: "/src/assets/heat.jpg",
    },
  ];

  // Categories data
  const categories = [
    { id: "all", name: "All Articles", count: blogPosts.length },
    { id: "climate", name: "Climate Science", count: 2 },
    { id: "storms", name: "Storms & Hurricanes", count: 1 },
    { id: "safety", name: "Weather Safety", count: 1 },
    { id: "technology", name: "Technology", count: 1 },
    { id: "education", name: "Education", count: 1 },
  ];

  // Featured posts (first two are featured)
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  // Filter posts by category
  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

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
          <h1 className="md:text-4xl text-2xl lg:text-5xl font-bold text-primary-900 mb-4">
            Weather Insights
          </h1>
          <p className="md:text-xl text-sm text-primary-700 max-w-3xl mx-auto leading-relaxed">
            Expert analysis, weather education, and the latest discoveries in
            meteorology and climate science.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <motion.input
              onClick={playClickSound}
              type="text"
              placeholder="Search weather articles..."
              className="w-full md:px-10 lg:px-12 px-3 md:py-4 py-2 pl-14 rounded-2xl border border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 transition-all duration-300 shadow-sm bg-white"
              whileFocus={{ scale: 1.02 }}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute md:left-5 left-3 top-1/2 transform -translate-y-1/2 text-primary-400 text-lg"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => {
                playClickSound();
                setActiveCategory(category.id);
              }}
              className={`md:px-6 px-2 md:py-3 py-1 rounded-full md:text-sm text-xs font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-primary-700 hover:bg-primary-50 border border-primary-200"
              }`}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.name}</span>
              <motion.span
                className={`md:px-2 px-1 py-1 rounded-full text-xs ${
                  activeCategory === category.id
                    ? "bg-white bg-opacity-20"
                    : "bg-primary-100 text-primary-600"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {category.count}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              className="md:text-3xl text-xl font-bold text-primary-900"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Featured Stories
            </motion.h2>
            <motion.div
              className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                variants={itemVariants}
                whileHover="hover"
                custom={index}
                variants={cardHover}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="px-3 py-1 bg-secondary-600 text-white text-sm font-medium rounded-full shadow-lg">
                      Featured
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-0"
                    whileHover={{ bgOpacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 md:text-sm text-xs text-primary-600 mb-3">
                    <motion.div
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FontAwesomeIcon icon={faCalendar} className="text-xs" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FontAwesomeIcon icon={faClock} className="text-xs" />
                      <span>{post.readTime}</span>
                    </motion.div>
                  </div>

                  <h3 className="md:text-xl text-sm font-bold text-primary-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-primary-700 mb-4 line-clamp-3 md:text-[14px] text-xs">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <motion.div
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white md:text-sm text-xs font-bold shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </motion.div>
                      <span className="md:text-sm text-xs font-medium text-primary-700">
                        {post.author}
                      </span>
                    </motion.div>

                    <motion.button
                      onClick={playClickSound}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="md:text-sm text-xs">Read More</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="md:text-sm text-xs"
                        />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        {/* All Articles */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              className="md:text-3xl text-xl font-bold text-primary-900"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Latest Articles
            </motion.h2>
            <motion.div
              className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  layout
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10"
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <motion.div
                        className="flex items-center space-x-2 md:text-sm text-xs text-primary-600"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="text-xs"
                        />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </motion.div>
                      <motion.span
                        className="px-2 py-1 bg-primary-100 text-primary-700 md:text-sm text-xs font-medium rounded-full"
                        whileHover={{ scale: 1.1 }}
                      >
                        {post.readTime}
                      </motion.span>
                    </div>

                    <motion.h3
                      className="md:text-lg text-sm font-bold text-primary-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300"
                      whileHover={{ color: "rgb(192, 38, 211)" }}
                    >
                      {post.title}
                    </motion.h3>

                    <p className="text-primary-700 md:text-sm text-xs mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-primary-100">
                      <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="w-6 h-6 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </motion.div>
                        <span className="text-xs font-medium text-primary-600">
                          {post.author.split(" ")[0]}
                        </span>
                      </motion.div>

                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={playClickSound}
                          className="text-primary-400 hover:text-accent-600 transition-colors duration-300"
                          whileHover={{ scale: 1.2, color: "rgb(244, 63, 94)" }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FontAwesomeIcon
                            icon={faBookmark}
                            className="text-sm"
                          />
                        </motion.button>
                        <motion.button
                          onClick={playClickSound}
                          className="text-primary-400 hover:text-secondary-600 transition-colors duration-300"
                          whileHover={{
                            scale: 1.2,
                            color: "rgb(192, 38, 211)",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FontAwesomeIcon icon={faShare} className="text-sm" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl md:p-8 p-3 text-center text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2
              className="md:text-2xl text-[15px] font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Stay Updated with Weather Science
            </motion.h2>
            <motion.p
              className="text-primary-100 mb-6 md:text-sm text-xs"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Get the latest weather insights, research updates, and educational
              content delivered to your inbox.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.input
                onClick={playClickSound}
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:px-4 px-2 md:py-3 py-1 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-lg"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                onClick={playClickSound}
                className="md:px-6 px-3 md:py-3 py-1 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-300 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Popular Tags */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3
            className="text-xl font-bold text-primary-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Popular Topics
          </motion.h3>
          <motion.div
            className="flex flex-wrap justify-center md:gap-3 gap-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "Climate Change",
              "Hurricane Tracking",
              "Weather Safety",
              "AI Forecasting",
              "Cloud Science",
              "Extreme Weather",
              "Seasonal Patterns",
              "Weather Technology",
            ].map((tag, index) => (
              <motion.button
                onClick={playClickSound}
                key={tag}
                className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs bg-white text-primary-700 rounded-full border border-primary-200 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 flex items-center md:space-x-2 space-x-1 shadow-sm"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  backgroundColor: "rgb(236, 254, 255)",
                  borderColor: "rgb(6, 182, 212)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faTags} className="text-xs" />
                <span className="text-sm font-medium">{tag}</span>
              </motion.button>
            ))}
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
      </div>
    </motion.div>
  );
};

export default Blog;
