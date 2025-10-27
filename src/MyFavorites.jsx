import React from "react";

const MyFavorites = ({theme}) => {
  return (
    <>
      <section className="max-w-screen-xl md:px-4 m-auto mb-10">
        <h1
          className={`text-2xl font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          My Favorite Pokémon
        </h1>
        {/* Add your favorite Pokémon here */}
      </section>
    </>
  );
};

export default MyFavorites;
