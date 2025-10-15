import React from "react";

const Footer = ({ theme }) => {
  return (
    <>
      <div
        className={`footer h-50 justify-center content-center shadow-sm ${
          theme === "dark" ? "bg-gray-800" : "bg-red-600"
        }`}
      >
        <a
          className={`logo font-extrabold text-4xl md:text-9xl ${
            theme === "dark" ? "text-white" : "text-white"
          }`}
        >
          PokéTeam Builder
        </a>
        <p className="justify-center w-full font-bold">© {new Date().getFullYear()} — Created by Jahangir Shaikh</p>
      </div>
    </>
  );
};

export default Footer;
