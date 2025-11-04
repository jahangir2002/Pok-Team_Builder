import React from "react";
import TooltipItem from "./TooltipItem";

const About = () => {
  return (
    <>
      <section className="max-w-screen-xl px-5 md:px-0 m-auto py-5">
        <h1 className=" text-center text-6xl font-bold my-5 ">About Us</h1>
        <div className="flex flex-col md:flex-row items-center md:px-5 gap-8 py-10">
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
              Discover, explore, and create your ultimate Pokémon team! With
              PokéTeam Builder, easily browse a vast collection of Pokémon
              cards, assemble your dream lineup, and favorite your top picks
              with a simple ❤️. Built using React and Tailwind CSS, powered by
              PokéAPI, and thoughtfully designed for a seamless, responsive
              experience on any device.
            </p>
          </div>
        </div>
        <div className="md:px-5 pb-10">
          <h2 className="text-4xl font-extrabold mb-3">About Me 👋</h2>
          <div className="text-xl leading-relaxed">
            Hi there, I'm Jahangir, a front-end developer with a passion for
            creating interactive applications. I gained experience with state
            management, component design, and API integration through this
            project. I mainly use{" "}
            <TooltipItem
              imgSrc="src/assets/Reactjs.jpg"
              imgAlt="React Js"
              title="React Js"
              description="ReactJS is a JavaScript library for building user interfaces, particularly for web and native applications."
              buttonText="React"
              buttonHref="https://react.dev/"
            />{" "}
            ,{" "}
            <TooltipItem
              imgSrc="src/assets/Tailwind-CSS.jpg"
              imgAlt="Tailwind CSS"
              title="Tailwind CSS"
              description="Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces."
              buttonText="Tailwind CSS"
              buttonHref="https://tailwindcss.com/"
            />
            , and{" "}
            <TooltipItem
              imgSrc="src/assets/Vite.jpg"
              imgAlt="Vite"
              title="Vite"
              description="Vite is a next-generation frontend tooling that provides an extremely fast development experience."
              buttonText="Vite"
              buttonHref="https://vitejs.dev/"
            />
            , but I also enjoy experimenting with animation libraries like{" "}
            <TooltipItem
              imgSrc="src/assets/Framer-Motion.jpg"
              imgAlt="Framer Motion"
              title="Framer Motion"
              description="Framer Motion is a production-ready motion library for React that makes animations simple."
              buttonText="Framer Motion"
              buttonHref="https://www.framer.com/motion/"
            />{" "}
            to make interfaces come to life. I like creating simple, responsive
            layouts that feel easy to use and enjoyable, incorporating playful
            user interface elements like dynamic icons and glassmorphism.
            Managing state across components and creating a theme-aware
            interface that feels like it belongs in the Pokémon universe were
            just two examples of how this project allowed me to push myself.
            Seeking more? View my{" "}
            <TooltipItem
              imgSrc="src/assets/jahangir2002.jpg"
              imgAlt="GitHub"
              title="GitHub"
              description="GitHub is a platform for software development and version control using Git. It hosts source code, issues, and project management features."
              buttonText="GitHub"
              buttonHref="https://github.com/jahangir2002"
            />{" "}
            or follow me on{" "}
            <TooltipItem
              imgSrc="src/assets/LinkedIn.jpg"
              imgAlt="LinkedIn"
              title="LinkedIn"
              description="LinkedIn is a business and employment-focused social media platform that works through websites and mobile apps."
              buttonText="LinkedIn"
              buttonHref="https://www.linkedin.com/in/shaikh-jahangir-alam-74b758222/"
            />
            .
          </div>
        </div>

        {/* ⚡ Future Goals & Next Steps */}

        <div className="md:px-5 pb-10">
          <h2 className="text-4xl font-extrabold mb-3">
            Future Goals & Next Steps ⚡
          </h2>
          <p className="text-xl leading-relaxed">
            I’m planning to evolve PokéTeam Builder from a simple Pokémon
            browser into a full-fledged MERN-based web app with real-time
            interaction and a connected user experience.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
