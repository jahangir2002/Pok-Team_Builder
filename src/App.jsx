import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import RotatingText from "./components/RotatingText";
import RotatingTitle from "./components/RotatingTitle";
import Pokemon from "./Pokemon";
import Footer from "./Footer";
import DarkBackground from "./components/DarkBackground";
import LightBackground from "./components/LightBackground";
import MyFavorites from "./MyFavorites";
import MyTeam from "./MyTeam";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./About";

const Home = ({
  searchTerm,
  theme,
  favoritePokemon,
  toggleFavorite,
  myTeamPokemon,
  toggleMyTeam,
}) => {
  return (
    <Pokemon
      searchTerm={searchTerm}
      theme={theme}
      favoritePokemon={favoritePokemon}
      toggleFavorite={toggleFavorite}
      myTeamPokemon={myTeamPokemon}
      toggleMyTeam={toggleMyTeam}
    />
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");
  const [favoritePokemon, setFavoritePokemon] = useState(new Set());
  const [myTeamPokemon, setMyTeamPokemon] = useState(new Set());
  const location = useLocation();

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleFavorite = (pokemonId) => {
    setFavoritePokemon((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(pokemonId)) {
        newFavorites.delete(pokemonId);
      } else {
        newFavorites.add(pokemonId);
      }
      localStorage.setItem(
        "favoritePokemon",
        JSON.stringify(Array.from(newFavorites))
      );
      return newFavorites;
    });
  };

  const toggleMyTeam = (pokemonId) => {
    setMyTeamPokemon((prev) => {
      const newTeam = new Set(prev);
      if (newTeam.has(pokemonId)) {
        newTeam.delete(pokemonId);
      } else {
        if (newTeam.size < 6) {
          newTeam.add(pokemonId);
        } else {
          alert("Your team is full! You can only have 6 Pokémon in your team.");
        }
      }
      localStorage.setItem(
        "myTeamPokemon",
        JSON.stringify(Array.from(newTeam))
      );
      return newTeam;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    const savedFavorites = localStorage.getItem("favoritePokemon");
    if (savedFavorites) {
      setFavoritePokemon(new Set(JSON.parse(savedFavorites)));
    }

    const savedTeam = localStorage.getItem("myTeamPokemon");
    if (savedTeam) {
      setMyTeamPokemon(new Set(JSON.parse(savedTeam)));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <DarkBackground className="pb-5">
          <Navbar
            onSearch={handleSearch}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          {location.pathname === '/' && <RotatingTitle theme={theme} />}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchTerm={searchTerm}
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              }
            />
            <Route
              path="/About"
              element={
                <About
                  searchTerm={searchTerm}
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              }
            />
            <Route
              path="/MyFavorites"
              element={
                <MyFavorites
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              }
            />
            <Route
              path="/MyTeam"
              element={
                <MyTeam
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              }
            />
          </Routes>
          <Footer theme={theme} />
        </DarkBackground>
      ) : (
        <LightBackground className="pb-5">
          <Navbar
            onSearch={handleSearch}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          {location.pathname === '/' && <RotatingTitle theme={theme} />}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchTerm={searchTerm}
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              }
            />
            <Route
              path="/About"
              element={
                <About
                  searchTerm={searchTerm}
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              }
            />
            <Route
              path="/MyFavorites"
              element={
                <MyFavorites
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              }
            />
            <Route
              path="/MyTeam"
              element={
                <MyTeam
                  theme={theme}
                  favoritePokemon={favoritePokemon}
                  toggleFavorite={toggleFavorite}
                  myTeamPokemon={myTeamPokemon}
                  toggleMyTeam={toggleMyTeam}
                />
              }
            />
          </Routes>
          <Footer theme={theme} />
        </LightBackground>
      )}
    </>
  );
};

export default App;
