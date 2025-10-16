import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import RotatingText from "./components/RotatingText";
import Pokemon from "./Pokemon";
import Footer from "./Footer";
import DarkBackground from "./components/DarkBackground";
import LightBackground from "./components/LightBackground";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <DarkBackground className="pb-5">
          <Navbar onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />
          <div className="font-extrabold text-5xl text-center py-5 leading-[1.5] flex flex-col justify-center md:flex-row text-white">
            PokéTeam{" "}
            <RotatingText
              texts={["Builder", "Cards", "Is", "Cool!"]}
              mainClassName="px-2 rounded-md px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg bg-cyan-500 text-black"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
          <Pokemon searchTerm={searchTerm} theme={theme} />
          <Footer theme={theme}/>
        </DarkBackground>
      ) : (
        <LightBackground className="pb-5">
          <Navbar onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />
          <div className="font-extrabold text-5xl text-center py-5 leading-[1.5] flex flex-col justify-center md:flex-row text-black">
            PokéTeam{" "}
            <RotatingText
              texts={["Builder", "Cards", "Is", "Cool!"]}
              mainClassName="px-2 rounded-md px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg bg-red-500 text-white"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
          <Pokemon searchTerm={searchTerm} theme={theme} />
          <Footer theme={theme}/>
        </LightBackground>
      )}
    </>
  );
};

export default App;
