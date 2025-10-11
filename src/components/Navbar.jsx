import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-red-600 shadow-sm">
        <div className="w-full max-w-[1400px] m-auto flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <div className="flex-1 text-center md:text-left">
            <a className="logo font-extrabold text-xl text-white">
              PokéTeam Builder
            </a>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-32 md:w-48"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
