import React, { useState } from "react";

const Navbar = ({ onSearch }) => {
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
      <div className="navbar bg-red-600 shadow-sm">
        <div className="w-full max-w-[1400px] m-auto flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <div className="flex-1 text-center md:text-left">
            <a className="logo font-extrabold text-xl text-white">
              PokéTeam Builder
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search Pokemon..."
                className="input input-bordered w-32 md:w-48 pr-8"
              />
              {searchValue && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
