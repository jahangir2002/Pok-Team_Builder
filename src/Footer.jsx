import React from "react";
import { FaGithub,FaLinkedin } from "react-icons/fa";

const Footer = ({ theme }) => {
  return (
    <>
      <div
        className={`footer gap-0 p-10 justify-center content-center shadow-sm ${
          theme === "dark" ? "backdrop-blur-[16px] backdrop-saturate-[180%] bg-[#111928]/75 rounded-[12px] border border-[hsla(0,0%,100%,0.125)] opacity-100" : "backdrop-blur-[16px] backdrop-saturate-[180%] bg-white/60 rounded-[12px] border border-[rgba(0,0,0,0.1)] opacity-100 shadow-md"
        }`}
      >
        <a
          className={`logo font-extrabold text-4xl md:text-9xl ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          PokéTeam Builder
        </a>
        
    
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-between w-full pt-5">
    <p>Copyright © {new Date().getFullYear()} - Created By Jahangir Shaikh</p>
    <div className="grid grid-cols-2 gap-5 cursor-pointer">
    <a href="https://github.com/jahangir2002" target="_blank" rel="noopener noreferrer">
      <FaGithub
        size="2em"
        className={`${theme === "dark" ? "text-white" : "text-black"} hover:${theme === "dark" ? "text-gray-300" : "text-gray-700"} transition-colors duration-200`}
      />
    </a>
    <a href="https://www.linkedin.com/in/shaikh-jahangir-alam-74b758222/" target="_blank" rel="noopener noreferrer">
    <FaLinkedin 
    size="2em"
    className={`${theme === "dark" ? "text-white" : "text-black"} hover:${theme === "dark" ? "text-gray-300" : "text-gray-700"} transition-colors duration-200`}
    />
    </a>
    </div>
    
  </nav>

      </div>
    </>
  );
};

export default Footer;
