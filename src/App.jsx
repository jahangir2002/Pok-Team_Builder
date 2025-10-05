import React from "react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <div className="w-full h-dvh bg-blue-200">
        <Navbar />
        <div className="font-extrabold text-5xl text-center py-4 ">
          PokéTeam Builder
        </div>
        
      </div>
    </>
  );
};

export default App;
