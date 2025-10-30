import React from "react";
import RotatingText from "./RotatingText";

const RotatingTitle = ({ theme }) => {
  return (
    <div
      className={`font-extrabold text-5xl text-center py-5 leading-[1.5] flex flex-col justify-center md:flex-row ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      PokéTeam{" "}
      <RotatingText
        texts={["Builder", "Cards", "Is", "Cool!"]}
        mainClassName={`px-2 rounded-md px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg ${
          theme === "dark" ? "bg-cyan-500 text-black" : "bg-red-500 text-white"
        }`}
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
  );
};

export default RotatingTitle;
