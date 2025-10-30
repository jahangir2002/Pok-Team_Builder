import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch, theme, toggleTheme }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <>
      <div className={`navbar shadow-sm ${theme === "dark" ? "backdrop-blur-[16px] backdrop-saturate-[180%] bg-[#111928]/75 rounded-[12px] border border-[hsla(0,0%,100%,0.125)] opacity-100" : "backdrop-blur-[16px] backdrop-saturate-[180%] bg-white/60 rounded-[12px] border border-[rgba(0,0,0,0.1)] opacity-100 shadow-md"}`}>
        <div className="w-full max-w-screen-xl md:px-4 m-auto flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <div className="flex gap-4 items-center text-center md:text-left flex-col md:flex-row md:gap-10">
            <a className={`logo font-extrabold text-xl ${theme === "dark" ? "text-white" : "text-black"}`}>
              PokéTeam Builder
            </a>
            <nav>
              <ul className="flex gap-5">
                <li className={` link no-underline text-md font-semibold ${theme === "dark" ? "link-info" : "link-error"}`}>
                  <Link to="/">Home</Link>
                </li>
                <li className={` link no-underline text-md font-semibold ${theme === "dark" ? "link-info" : "link-error"}`}>
                  <Link to="/About">About Us</Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search by name, type, or ability..."
                className={`input input-bordered w-80  pr-8 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-black placeholder-gray-500"}`}
              />
              {searchValue && (
                <button
                  onClick={handleClearSearch}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}`}
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* DaisyUI Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`btn btn-ghost btn-circle ${theme === "dark" ? "text-yellow-400 hover:bg-gray-700" : "text-yellow-600 hover:bg-red-700"}`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
