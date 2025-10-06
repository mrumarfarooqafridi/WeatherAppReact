import React, { useState, useEffect } from "react";
import {
  faThermometerHalf,
  faTint,
  faWind,
  faCloud,
  faEye,
  faCompass,
  faChartLine,
  faCalendarAlt,
  faMapMarkerAlt,
  faSearch,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import clickSound from "../assets/click.wav";
import { motion } from "framer-motion";

const playClickSound = () => {
  const audio = new Audio(clickSound);
  audio.play().catch((e) => console.log("Click sound failed:", e));
};

const Dashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Rawalpindi");
  const [unit, setUnit] = useState("metric");
  const [searchInput, setSearchInput] = useState("Kohat");

  const API_KEY = "473fcc5f816a741d00427932cf3206cc";

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

  // Get weather icon based on OpenWeatherMap condition code
  const getWeatherIcon = (conditionCode) => {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "⛅",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌦️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[conditionCode] || "🌤️";
  };

  // Format time from timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Convert wind degrees to direction
  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  // Fetch current weather data
  const fetchCurrentWeather = async (city, unit = `metric`) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"473fcc5f816a741d00427932cf3206cc"}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error(
        `Weather data not found for "${city}". Please try another city.`
      );
    }

    const data = await response.json();

    const weatherData = {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed:
        unit === "metric"
          ? Math.round(data.wind.speed * 3.6)
          : Math.round(data.wind.speed * 2.237), // Convert to km/h or mph
      windDirection: getWindDirection(data.wind.deg),
      pressure: data.main.pressure,
      visibility:
        unit === "metric"
          ? (data.visibility / 1000).toFixed(1)
          : (data.visibility / 1609.34).toFixed(1), // Convert to km or miles
      sunrise: formatTime(data.sys.sunrise),
      sunset: formatTime(data.sys.sunset),
      icon: getWeatherIcon(data.weather[0].icon),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      clouds: data.clouds?.all || 0,
    };

    return weatherData;
  };

  // Fetch forecast data
  const fetchForecast = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${"473fcc5f816a741d00427932cf3206cc"}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error(`Forecast data not found for "${city}"`);
    }

    const data = await response.json();

    // Group forecast by day and get daily data
    const dailyForecast = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < data.list.length; i += 8) {
      const dayData = data.list[i];
      const date = new Date(dayData.dt * 1000);
      const dayName = i === 0 ? "Today" : days[date.getDay()];

      // Find max and min temp for the day
      let maxTemp = dayData.main.temp_max;
      let minTemp = dayData.main.temp_min;

      for (let j = i; j < Math.min(i + 8, data.list.length); j++) {
        maxTemp = Math.max(maxTemp, data.list[j].main.temp_max);
        minTemp = Math.min(minTemp, data.list[j].main.temp_min);
      }

      dailyForecast.push({
        day: dayName,
        high: Math.round(maxTemp),
        low: Math.round(minTemp),
        condition: dayData.weather[0].description,
        icon: getWeatherIcon(dayData.weather[0].icon),
        precipitation: Math.round((dayData.pop || 0) * 100),
      });

      if (dailyForecast.length >= 5) break; // Show 5-day forecast
    }

    return dailyForecast;
  };

  // Fetch all weather data
  const fetchWeatherData = async () => {
    if (!searchInput.trim()) return;

    setLoading(true);
    setError(null);
    setLocation(searchInput.trim());

    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(searchInput.trim()),
        fetchForecast(searchInput.trim()),
      ]);

      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  useEffect(() => {
    fetchWeatherData();
  }, [unit]); // Refetch when unit changes

  // Weather metrics cards
  const weatherMetrics = [
    {
      title: "Feels Like",
      value: `${currentWeather?.feelsLike || "--"}°`,
      icon: faThermometerHalf,
      color: "text-secondary-500",
      bgColor: "bg-secondary-50",
      unit: unit === "metric" ? "C" : "F",
    },
    {
      title: "Humidity",
      value: `${currentWeather?.humidity || "--"}%`,
      icon: faTint,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
    },
    {
      title: "Wind Speed",
      value: `${currentWeather?.windSpeed || "--"}`,
      icon: faWind,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
      unit: unit === "metric" ? "km/h" : "mph",
      detail: currentWeather?.windDirection
        ? `• ${currentWeather.windDirection}`
        : "",
    },
    {
      title: "Pressure",
      value: `${currentWeather?.pressure || "--"} hPa`,
      icon: faCompass,
      color: "text-secondary-500",
      bgColor: "bg-secondary-50",
    },
    {
      title: "Visibility",
      value: `${currentWeather?.visibility || "--"}`,
      icon: faEye,
      color: "text-accent-600",
      bgColor: "bg-accent-50",
      unit: unit === "metric" ? "km" : "mi",
    },
    {
      title: "Cloud Cover",
      value: `${currentWeather?.clouds || "--"}%`,
      icon: faCloud,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
    },
  ];

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading weather data for {location}...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-96"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center text-primary-900">
          <motion.div
            className="text-4xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌧️
          </motion.div>
          <p className="text-lg font-semibold">Unable to load weather data</p>
          <p className="mt-2 text-gray-600 max-w-md">{error}</p>
          <motion.button
            onClick={() => {
              fetchWeatherData();
              playClickSound();
            }}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
        {/* Header - CHANGED: Use animate instead of whileInView */}
        <motion.div
          className="lg:mb-8 md:mb-6 "
          initial="hidden"
          animate="visible" // CHANGED: from whileInView to animate
          variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              className=" flex items-center space-x-4"
              variants={itemVariants}
            >
              <div className="flex bg-white rounded-lg border border-primary-200 p-1 shadow-sm">
                <motion.button
                  onClick={() => setUnit("metric")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    unit === "metric"
                      ? "bg-primary-600 text-white"
                      : "text-primary-700 hover:bg-primary-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  °C
                </motion.button>
                <motion.button
                  onClick={() => setUnit("imperial")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    unit === "imperial"
                      ? "bg-primary-600 text-white"
                      : "text-primary-700 hover:bg-primary-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  °F
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search Bar - CHANGED: Use animate instead of whileInView */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} // CHANGED: from whileInView to animate
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center max-w-md mx-auto bg-white rounded-lg shadow-sm border border-primary-200 overflow-hidden"
          >
            <input
              onClick={playClickSound}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search city..."
              className="flex-1 md:px-4 px-2 md:py-3 py-1 text-primary-900 md:text-lg text-xs bg-transparent focus:outline-none placeholder-primary-400"
            />
            <motion.button
              onClick={playClickSound}
              type="submit"
              className="md:px-6 px-4 md:py-3 py-1 bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </motion.button>
          </form>
        </motion.div>

        {/* Current Weather Overview - CHANGED: Use animate instead of whileInView */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Weather Card */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-xl shadow-lg md:p-6 p-3 border border-primary-100"
            initial="hidden"
            animate="visible" // CHANGED: from whileInView to animate
            variants={containerVariants}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <motion.div
                  className="flex items-center space-x-2 mb-4"
                  variants={itemVariants}
                >
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-primary-600"
                  />
                  <h2 className="md:text-xl text-lg font-semibold text-primary-900">
                    {currentWeather?.location}
                  </h2>
                </motion.div>
                <div className="flex items-center space-x-6">
                  <motion.span
                    className="md:text-6xl text-5xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5,
                    }}
                  >
                    {currentWeather?.icon}
                  </motion.span>
                  <div className="flex-1">
                    <motion.div
                      className="md:text-5xl text-3xl font-bold text-primary-900 mb-2"
                      variants={itemVariants}
                    >
                      {currentWeather?.temperature}°
                    </motion.div>
                    <motion.div
                      className="text-primary-700 capitalize md:text-lg text-xs"
                      variants={itemVariants}
                    >
                      {currentWeather?.condition}
                    </motion.div>
                    <motion.div
                      className="flex items-center space-x-4 mt-2 md:text-sm text-xs text-primary-600"
                      variants={itemVariants}
                    >
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
                        High: {currentWeather?.high}°
                      </span>
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faArrowDown} className="mr-1" />
                        Low: {currentWeather?.low}°
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
              <motion.div
                className="mt-4 md:mt-0 grid grid-cols-2 gap-4 md:text-sm text-xs"
                variants={containerVariants}
              >
                <motion.div
                  className="text-center md:p-3 p-2 bg-primary-50 rounded-lg border border-primary-100"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-primary-600 font-semibold">Sunrise</div>
                  <div className="text-primary-800 font-medium">
                    {currentWeather?.sunrise}
                  </div>
                </motion.div>
                <motion.div
                  className="text-center md:p-3 p-2 bg-secondary-50 rounded-lg border border-secondary-100"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-secondary-600 font-semibold">Sunset</div>
                  <div className="text-secondary-800 font-medium">
                    {currentWeather?.sunset}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl shadow-lg p-6 text-white"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }} // CHANGED: from whileInView to animate
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 20px 25px -5px rgba(6, 182, 212, 0.3), 0 10px 10px -5px rgba(192, 38, 211, 0.1)",
            }}
          >
            <h3 className="md:text-lg text-sm font-semibold mb-4">
              Today's Overview
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Temperature Range",
                  value: `${currentWeather?.high}° / ${currentWeather?.low}°`,
                },
                { label: "Feels Like", value: `${currentWeather?.feelsLike}°` },
                { label: "Humidity", value: `${currentWeather?.humidity}%` },
                {
                  label: "Wind",
                  value: `${currentWeather?.windSpeed} ${
                    unit === "metric" ? "km/h" : "mph"
                  }${
                    currentWeather?.windDirection
                      ? ` • ${currentWeather.windDirection}`
                      : ""
                  }`,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }} // CHANGED: from whileInView to animate
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <span className="md:text-[16px] text-xs">{item.label}</span>
                  <span className="font-semibold md:text-[16px] text-xs">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Weather Metrics Grid - CHANGED: Use animate instead of whileInView */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible" // CHANGED: from whileInView to animate
          transition={{ delay: 0.5 }}
        >
          {weatherMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className={`${metric.bgColor} rounded-xl shadow-md md:p-6 p-3 border border-primary-100 transition-all duration-300`}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                y: -5,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={playClickSound}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-primary-700 md:text-sm text-xs font-medium">
                    {metric.title}
                  </div>
                  <div className="md:text-2xl text-xl font-bold text-primary-900 mt-1">
                    {metric.value}
                    {metric.unit && (
                      <span className="text-lg ml-1">{metric.unit}</span>
                    )}
                  </div>
                  {metric.detail && (
                    <div className="md:text-sm text-xs text-primary-600 mt-1">
                      {metric.detail}
                    </div>
                  )}
                </div>
                <motion.div
                  className={`${metric.color} text-2xl`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon icon={metric.icon} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 5-Day Forecast - CHANGED: Use animate instead of whileInView */}
        <motion.div
          className="bg-white rounded-xl shadow-lg md:p-6 p-3 mb-8 border border-primary-100"
          initial="hidden"
          animate="visible" // CHANGED: from whileInView to animate
          variants={containerVariants}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <motion.h3
              className="md:text-xl text-lg font-semibold text-primary-900 flex items-center"
              variants={itemVariants}
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-2 text-primary-600"
              />
              5-Day Forecast
            </motion.h3>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-primary-400"
              />
            </motion.div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <motion.div
                key={index}
                className="text-center md:p-4 p-2 bg-primary-50 rounded-lg border border-primary-100 hover:bg-primary-100 transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.1)",
                }}
              >
                <div className="font-semibold text-primary-800 md:text-[16px] text-sm mb-2">
                  {day.day}
                </div>
                <motion.div
                  className="md:text-3xl text-2xl mb-2"
                  whileHover={{ scale: 1.2 }}
                >
                  {day.icon}
                </motion.div>
                <div className="md:text-sm text-xs text-primary-700 mb-1 capitalize">
                  {day.condition}
                </div>
                <div className="flex justify-center space-x-3 md:text-sm text-xs mb-1">
                  <span className="font-semibold text-primary-900">
                    {day.high}°
                  </span>
                  <span className="text-primary-600">{day.low}°</span>
                </div>
                <div className="md:text-xs text-[10px] text-primary-600 mt-1">
                  {day.precipitation}% precip
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Insights - CHANGED: Use animate instead of whileInView */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Summary */}
          <motion.div
            className="bg-white rounded-xl shadow-lg md:p-6 p-3 border border-primary-100"
            initial="hidden"
            animate="visible" // CHANGED: from whileInView to animate
            variants={slideInLeft}
            transition={{ delay: 0.7 }}
          >
            <h3 className="md:text-xl text-lg font-semibold text-primary-900 mb-4">
              Weather Summary
            </h3>
            <div className="space-y-3 md:text-[16px] text-[12px]">
              {[
                {
                  label: "Current Condition",
                  value: currentWeather?.condition,
                },
                {
                  label: "Cloud Coverage",
                  value: `${currentWeather?.clouds}%`,
                },
                {
                  label: "Atmospheric Pressure",
                  value: `${currentWeather?.pressure} hPa`,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center p-3 bg-primary-50 rounded-lg"
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-primary-700">{item.label}</span>
                  <span className="text-primary-900 font-medium capitalize">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            className="bg-white rounded-xl shadow-lg md:p-6 p-3 border border-primary-100"
            initial="hidden"
            animate="visible" // CHANGED: from whileInView to animate
            variants={slideInLeft}
            transition={{ delay: 0.8 }}
          >
            <h3 className="md:text-xl text-lg font-semibold text-primary-900 mb-4">
              Location Information
            </h3>
            <div className="space-y-3 md:text-[16px] text-[12px]">
              {[
                { label: "Local Time", value: new Date().toLocaleTimeString() },
                { label: "Data Source", value: "OpenWeatherMap" },
                {
                  label: "Last Updated",
                  value: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center p-3 bg-primary-50 rounded-lg"
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-primary-700">{item.label}</span>
                  <span className="text-primary-900 font-medium">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Note - CHANGED: Use animate instead of whileInView */}
        <motion.div
          className="mt-8 text-center text-primary-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} // CHANGED: from whileInView to animate
          transition={{ delay: 0.9 }}
        >
          <p>Data updates in real-time • Powered by Weather Web</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
