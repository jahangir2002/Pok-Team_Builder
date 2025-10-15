import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import RotatingText from "./components/RotatingText";
import Pokemon from "./Pokemon";

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
      <div className={`w-full h-full pb-5 ${theme === "dark" ? "bg-gray-900" : "bg-blue-200"}`}>
        <Navbar onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />
        <div className={`font-extrabold text-5xl text-center py-5 leading-[1.5] flex flex-col justify-center md:flex-row ${theme === "dark" ? "text-white" : "text-black"}`}>
          PokéTeam{" "}
          <RotatingText
            texts={["Builder", "Cards", "Is", "Cool!"]}
            mainClassName={`px-2 rounded-md px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg ${theme === "dark" ? "bg-cyan-500 text-white" : "bg-red-500 text-white"}`}
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
      </div>
    </>
  );
};

export default App;
