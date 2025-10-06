import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import clickSound from "../assets/click.wav";

const playClickSound = () => {
  const audio = new Audio(clickSound);
  audio.play().catch((e) => console.log("Click sound failed:", e));
};

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map updates when season changes
const MapUpdater = ({ data, seasonFilter }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      const filteredData =
        seasonFilter === "all"
          ? data
          : data.filter((city) => city.season === seasonFilter);

      if (filteredData.length > 0) {
        const group = new L.featureGroup(
          filteredData.map((city) => L.marker([city.lat, city.lon]))
        );
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [data, seasonFilter, map]);

  return null;
};

const Map = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSeason, setActiveSeason] = useState("all");
  const [weatherData, setWeatherData] = useState([]);

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

  // Season configuration with colors and temperature ranges
  const seasons = {
    winter: {
      name: "Winter",
      color: "#06B6D4", // primary-600
      tempRange: [-30, 10],
      icon: "❄️",
    },
    spring: {
      name: "Spring",
      color: "#D946EF", // secondary-600
      tempRange: [10, 20],
      icon: "🌱",
    },
    summer: {
      name: "Summer",
      color: "#F43F5E", // accent-600
      tempRange: [20, 40],
      icon: "☀️",
    },
    autumn: {
      name: "Autumn",
      color: "#E879F9", // secondary-400
      tempRange: [5, 18],
      icon: "🍂",
    },
    all: {
      name: "All Seasons",
      color: "#0891B2", // primary-700
      tempRange: [-30, 40],
      icon: "🌍",
    },
  };

  // Major cities around the world for weather data
  const majorCities = [
    { name: "New York", lat: 40.7128, lon: -74.006, country: "US" },
    { name: "London", lat: 51.5074, lon: -0.1278, country: "UK" },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503, country: "JP" },
    { name: "Sydney", lat: -33.8688, lon: 151.2093, country: "AU" },
    { name: "Moscow", lat: 55.7558, lon: 37.6173, country: "RU" },
    { name: "Dubai", lat: 25.2048, lon: 55.2708, country: "AE" },
    { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, country: "BR" },
    { name: "Cape Town", lat: -33.9249, lon: 18.4241, country: "ZA" },
    { name: "Mumbai", lat: 19.076, lon: 72.8777, country: "IN" },
    { name: "Beijing", lat: 39.9042, lon: 116.4074, country: "CN" },
    { name: "Paris", lat: 48.8566, lon: 2.3522, country: "FR" },
    { name: "Berlin", lat: 52.52, lon: 13.405, country: "DE" },
    { name: "Toronto", lat: 43.6532, lon: -79.3832, country: "CA" },
    { name: "Mexico City", lat: 19.4326, lon: -99.1332, country: "MX" },
    { name: "Singapore", lat: 1.3521, lon: 103.8198, country: "SG" },
  ];

  // Get season based on temperature
  const getSeasonFromTemp = (temp) => {
    if (temp <= seasons.winter.tempRange[1]) return "winter";
    if (temp <= seasons.spring.tempRange[1]) return "spring";
    if (temp <= seasons.summer.tempRange[1]) return "summer";
    return "autumn";
  };

  // Create custom marker icon
  const createCustomIcon = (temperature, season) => {
    const seasonConfig = seasons[season];
    return L.divIcon({
      className: "custom-weather-marker",
      html: `
        <div class="relative">
          <div class="w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs" 
               style="background: ${seasonConfig.color}">
            ${temperature}°
          </div>
          <div class="absolute -top-1 -right-1 text-lg">${seasonConfig.icon}</div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  // Fetch weather data for all cities
  const fetchWeatherData = async () => {
    const API_KEY = "5a0f969dcd8751db5b957d83a03adf7e";

    try {
      const promises = majorCities.map(async (city) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
          );

          if (!response.ok)
            throw new Error(`Failed to fetch data for ${city.name}`);

          const data = await response.json();
          return {
            ...city,
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            season: getSeasonFromTemp(data.main.temp),
            icon: data.weather[0].main.toLowerCase(),
          };
        } catch (err) {
          console.error(`Error fetching ${city.name}:`, err);
          // Return mock data if API fails
          const mockTemp = Math.floor(Math.random() * 40) - 10;
          return {
            ...city,
            temperature: mockTemp,
            condition: "clear sky",
            humidity: 65,
            season: getSeasonFromTemp(mockTemp),
            icon: "clear",
          };
        }
      });

      const results = await Promise.all(promises);
      setWeatherData(results);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to load weather data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Get count of cities in each season
  const getSeasonCounts = () => {
    const counts = { all: weatherData.length };
    Object.keys(seasons).forEach((season) => {
      if (season !== "all") {
        counts[season] = weatherData.filter(
          (city) => city.season === season
        ).length;
      }
    });
    return counts;
  };

  const seasonCounts = getSeasonCounts();

  // Filter data based on active season
  const filteredData =
    activeSeason === "all"
      ? weatherData
      : weatherData.filter((city) => city.season === activeSeason);

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center h-96 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-primary-700 font-medium text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading Advanced Weather Map
          </motion.p>
          <motion.p
            className="text-primary-600 text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Fetching real-time global data...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex items-center justify-center h-96 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center text-primary-900 p-6">
          <motion.div
            className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">⚠️</span>
          </motion.div>
          <p className="text-lg font-semibold mb-2">Connection Error</p>
          <p className="text-primary-700 mb-4">{error}</p>
          <motion.div
            onClick={playClickSound}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(6, 182, 212, 0.3), 0 10px 10px -5px rgba(192, 38, 211, 0.1)",
              }}
            >
              Retry Connection
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Container */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-100/50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 md:p-8 p-3 text-white relative overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="md:text-3xl text-lg lg:text-4xl font-bold mb-3 drop-shadow-lg">
                  Global Weather Intelligence
                </h1>
                <p className="text-primary-100 md:text-lg text-sm max-w-2xl leading-relaxed">
                  Real-time temperature monitoring with seasonal analysis across
                  major global cities
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 lg:gap-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-xl md:p-4 p-2 text-center min-w-[120px]"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="md:text-2xl text-lg font-bold">
                    {weatherData.length}
                  </div>
                  <div className="text-primary-100 md:text-sm text-xs font-medium">
                    Total Cities
                  </div>
                </motion.div>
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-xl md:p-4 p-2 text-center min-w-[120px]"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="md:text-2xl text-lg font-bold">
                    {weatherData.length > 0
                      ? Math.round(
                          weatherData.reduce(
                            (sum, city) => sum + city.temperature,
                            0
                          ) / weatherData.length
                        )
                      : 0}
                    °C
                  </div>
                  <div className="text-primary-100 md:text-sm text-xs font-medium">
                    Avg Temp
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Season Filter Section */}
        <div className="bg-white md:p-6 p-3 border-b border-primary-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <motion.h3
              className="text-lg font-semibold text-primary-900 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Filter by Temperature Season
            </motion.h3>
            <motion.div
              className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {filteredData.length} of {weatherData.length} cities shown
            </motion.div>
          </div>

          <motion.div
            className="flex flex-wrap gap-3 md:justify-start md:items-start justify-center items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(seasons).map(([key, season]) => (
              <motion.button
                key={key}
                onClick={() => {
                  playClickSound();
                  setActiveSeason(key);
                }}
                className={`flex items-center md:space-x-3 space-x-1 md:px-5 px-1 md:py-3 py-1 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
                  activeSeason === key
                    ? "text-white shadow-lg transform scale-105 ring-2 ring-white ring-opacity-50"
                    : "text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200"
                }`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor:
                    activeSeason === key ? season.color : undefined,
                }}
              >
                <span className="md:text-xl text-sm">{season.icon}</span>
                <span className="md:text-sm text-xs lg:text-base">
                  {season.name}
                </span>
                <motion.span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold min-w-[32px] ${
                    activeSeason === key
                      ? "bg-white bg-opacity-20"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {seasonCounts[key]}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Map Container */}
        <div className="w-full md:p-4 p-2 lg:p-6">
          <motion.div
            className="rounded-xl overflow-hidden shadow-lg border border-primary-200 h-96 lg:h-[500px] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <MapContainer
              center={[20, 0]}
              zoom={2}
              style={{ height: "100%", width: "100%" }}
              className="z-0 rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapUpdater data={weatherData} seasonFilter={activeSeason} />

              {filteredData.map((city, index) => (
                <Marker
                  key={`${city.lat}-${city.lon}`}
                  position={[city.lat, city.lon]}
                  icon={createCustomIcon(city.temperature, city.season)}
                >
                  <Popup className="rounded-xl shadow-2xl">
                    <motion.div
                      className="md:p-4 p-1 min-w-[240px]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold md:text-xl text-lg text-primary-900">
                          {city.name}
                        </h3>
                        <motion.span
                          className="md:text-3xl text-lg"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 5,
                          }}
                        >
                          {seasons[city.season].icon}
                        </motion.span>
                      </div>

                      <div className="md:space-y-3 space-y-1">
                        <motion.div
                          className="flex items-center justify-between md:p-3 p-1 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-gray-600 font-medium">
                            Temperature:
                          </span>
                          <span
                            className="font-bold md:text-lg"
                            style={{ color: seasons[city.season].color }}
                          >
                            {city.temperature}°C
                          </span>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-3">
                          <motion.div
                            className="text-center md:p-2 p-1 text-xs bg-gray-50 rounded-lg"
                            whileHover={{ y: -2 }}
                          >
                            <div className="md:text-sm text-xs text-gray-600">
                              Condition
                            </div>
                            <div className="font-semibold text-gray-800 capitalize">
                              {city.condition}
                            </div>
                          </motion.div>
                          <motion.div
                            className="text-center md:p-2 p-1 bg-gray-50 rounded-lg text-xs"
                            whileHover={{ y: -2 }}
                          >
                            <div className="text-sm text-gray-600">
                              Humidity
                            </div>
                            <div className="font-semibold text-gray-800">
                              {city.humidity}%
                            </div>
                          </motion.div>
                        </div>

                        <motion.div
                          className="flex items-center justify-between md:p-2 p-1 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg text-xs"
                          whileHover={{ scale: 1.01 }}
                        >
                          <span className="text-gray-700 font-medium">
                            Season:
                          </span>
                          <span className="font-semibold text-primary-800 capitalize">
                            {city.season}
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        </div>

        {/* Enhanced Information Panel */}
        <div className="bg-white p-6 lg:p-8 border-t border-primary-100">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Season Legend */}
            <motion.div
              className="xl:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl md:p-6 p-1 h-full">
                <h3 className="md:text-xl text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  Season Temperature Ranges
                </h3>
                <div className="space-y-3">
                  {Object.entries(seasons).map(([key, season]) => {
                    if (key === "all") return null;
                    return (
                      <motion.div
                        key={key}
                        className="flex items-center justify-between md:p-3 p-1 bg-white rounded-xl shadow-sm border border-primary-100 hover:shadow-md transition-all duration-300"
                        whileHover={{
                          scale: 1.02,
                          borderColor: season.color,
                          boxShadow: `0 10px 15px -3px ${season.color}20`,
                        }}
                      >
                        <div className="flex items-center md:space-x-3 space-x-1">
                          <motion.div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: season.color }}
                            whileHover={{ scale: 1.2 }}
                          />
                          <span className="font-semibold text-primary-800 md:text-[16px] text-sm">
                            {season.name}
                          </span>
                          <span className="md:text-lg text-sm">
                            {season.icon}
                          </span>
                        </div>
                        <div className="md:text-sm text-xs font-medium text-primary-600 bg-primary-100 md:px-2 px-1 py-1 rounded-full">
                          {season.tempRange[0]}°C - {season.tempRange[1]}°C
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Statistics Grid */}
            <motion.div
              className="xl:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2 lg:gap-6">
                {[
                  {
                    label: "Total Cities",
                    value: weatherData.length,
                    gradient: "from-primary-500 to-primary-600",
                  },
                  {
                    label: "Average Temp",
                    value: `${
                      weatherData.length > 0
                        ? Math.round(
                            weatherData.reduce(
                              (sum, city) => sum + city.temperature,
                              0
                            ) / weatherData.length
                          )
                        : 0
                    }°C`,
                    gradient: "from-secondary-500 to-secondary-600",
                  },
                  {
                    label: "Highest Temp",
                    value: `${
                      weatherData.length > 0
                        ? Math.max(
                            ...weatherData.map((city) => city.temperature)
                          )
                        : 0
                    }°C`,
                    gradient: "from-accent-500 to-accent-600",
                  },
                  {
                    label: "Lowest Temp",
                    value: `${
                      weatherData.length > 0
                        ? Math.min(
                            ...weatherData.map((city) => city.temperature)
                          )
                        : 0
                    }°C`,
                    gradient: "from-primary-600 to-secondary-600",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`bg-gradient-to-br ${stat.gradient} md:p-5 p-2 rounded-2xl text-white text-center shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div className="md:text-3xl text-xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="md:text-lg text-sm font-medium opacity-90">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Usage Instructions */}
              <motion.div
                className="mt-6 lg:mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="font-bold text-primary-800 mb-4 md:text-lg text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  Interactive Map Guide
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:text-sm text-xs text-primary-700">
                  {[
                    {
                      number: "1",
                      title: "Season Filtering",
                      desc: "Click season buttons to filter cities by temperature ranges",
                    },
                    {
                      number: "2",
                      title: "City Details",
                      desc: "Click markers to view detailed weather information",
                    },
                    {
                      number: "3",
                      title: "Map Navigation",
                      desc: "Use mouse wheel to zoom and drag to pan the map",
                    },
                    {
                      number: "4",
                      title: "Color Coding",
                      desc: "Marker colors represent seasonal temperature ranges",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-xs font-bold">
                          {item.number}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-primary-800">
                          {item.title}
                        </div>
                        <div>{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
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

export default Map;
