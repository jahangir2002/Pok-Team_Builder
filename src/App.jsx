import React from "react";
import Navbar from "./components/Navbar";
import RotatingText from "./components/RotatingText";

const App = () => {
  return (
    <>
      <div className="w-full h-dvh bg-blue-200">
        <Navbar />
        <div className="font-extrabold text-black text-5xl text-center py-5 leading-[1.5] flex flex-col justify-center md:flex-row">
          PokéTeam{" "}
            <RotatingText
              texts={["Builder", "Cards", "Is", "Cool!"]}
              mainClassName="bg-red-600 px-2 rounded-md text-stone-50 px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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
      </div>
    </>
  );
};

export default App;
