import React from "react";

const About = () => {
  return (
    <>
      <section className="max-w-screen-xl px-5 md:px-0 m-auto py-5">
        <h1 className=" text-center text-6xl font-bold my-5 ">About Us</h1>
        <div className="flex flex-col md:flex-row items-center md:px-5 gap-8">
          <figure className="md:order-2 flex-shrink-0">
            <img
              src="src/assets/pikachu.svg"
              alt="Pikachu mascot"
              className="w-64 md:w-96 h-auto drop-shadow-xl"
              loading="lazy"
            />
          </figure>
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold mb-3">PokéTeam Builder</h2>
            <p className="text-xl leading-relaxed">
              Discover, explore, and create your ultimate Pokémon team! With PokéTeam Builder, easily browse a vast collection of Pokémon cards, assemble your dream lineup, and favorite your top picks with a simple ❤️. Built using React and Tailwind CSS, powered by PokéAPI, and thoughtfully designed for a seamless, responsive experience on any device.
            </p>
          </div>
        </div>
        <div className="md:px-5">
          <h2 className="text-4xl font-extrabold mb-3">About Me 👋</h2>
          <p className="text-xl leading-relaxed">  
          Hi there, I'm Jahangir, a front-end developer with a passion for creating interactive applications.  I gained experience with state management, component design, and API integration through this project.  I mainly use React, Tailwind CSS, and Vite, but I also enjoy experimenting with animation libraries like Framer Motion and Lenis to make interfaces come to life.  I like creating simple, responsive layouts that feel easy to use and enjoyable, incorporating playful user interface elements like dynamic icons and glassmorphism.  Managing state across components and creating a theme-aware interface that feels like it belongs in the Pokémon universe were just two examples of how this project allowed me to push myself.  Seeking more?  View my [GitHub] or follow me on [LinkedIn].
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
