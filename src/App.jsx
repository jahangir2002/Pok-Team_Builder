import React from "react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <div className="w-full h-dvh bg-blue-200">
        <Navbar />
        <div className="font-extrabold text-black text-5xl text-center py-5 leading-[1.5]">
          PokéTeam <span className="bg-red-600 px-2 rounded-md text-stone-50">Builder</span>
        </div>
        
      </div>
    </>
  );
};

export default App;
