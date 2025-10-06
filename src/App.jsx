import React, { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import BrandCarousel from "./components/BrandCarousel";
import Map from "./components/Map"; // Import the Map component
import Dashboard from "./components/Dashboad"; // Import the Dashboard component
import Guide from "./components/Guide";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";

const App = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // 'home', 'map', or 'dashboard'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Render Different Sections of webPage */}
      <div className="w-full">
        {activeSection === "home" && (
          <>
            <Home />
          </>
        )}
        {activeSection === "guide" && (
          <div className="w-full">
            <Guide />
          </div>
        )}

        {activeSection === "map" && (
          <div className="w-full">
            <Map />
          </div>
        )}

        {activeSection === "dashboard" && (
          <div className="w-full">
            <Dashboard />
          </div>
        )}
        {activeSection === "blog" && (
          <div className="w-full">
            <Blog />
          </div>
        )}
        {activeSection === "pricings" && (
          <div className="w-full">
            <Pricing />
          </div>
        )}
        <BrandCarousel />
        <Footer />
      </div>
    </div>
  );
};

export default App;
