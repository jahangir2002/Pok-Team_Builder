# 🌟 Pokedex React App 🌟

A beautiful and responsive React application that allows users to browse, search, and explore a vast collection of Pokemon! 🚀 This project leverages the PokeAPI to fetch Pokemon data and presents it in an engaging and user-friendly interface.

## 🚀 Key Features

- **Browse Pokemon:** Explore a comprehensive list of Pokemon with details like name, image, types, and statistics.
- **Search Functionality:** Quickly find your favorite Pokemon by name, type, or ability using the intuitive search bar. 🔍
- **Dynamic Filtering:**  The Pokemon list updates in real-time as you type in the search bar, providing a seamless search experience.
- **Interactive Cards:** Each Pokemon is displayed in a visually appealing card with a spotlight effect that follows the mouse cursor. ✨
- **Rotating Text:**  A stylish rotating text element adds a touch of flair to the application. 💫
- **Responsive Design:**  The application is designed to work seamlessly on various devices, from desktops to mobile phones. 📱
- **Loading and Error Handling:**  Provides clear visual feedback during data fetching and gracefully handles potential errors.
- **Spotlight Feature:** Highlights a specific Pokemon with an interactive spotlight card.

## 🛠️ Tech Stack

- **Frontend:**
    - React: JavaScript library for building user interfaces.
    - React Hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useImperativeHandle` for managing component state and side effects.
    - JSX:  Syntax extension to JavaScript for writing HTML-like structures in React components.
    - Tailwind CSS: Utility-first CSS framework for styling the application.
    - `@tailwindcss/vite`: Vite plugin for Tailwind CSS integration.
    - `motion/react`: Library for creating animations.
- **Build Tool:**
    - Vite:  A fast and lightweight build tool for modern web development.
- **API:**
    - PokeAPI:  RESTful API providing Pokemon data.
- **Other:**
    - `cn`: Utility function for conditionally joining class names.

## 📦 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (version 16 or higher) installed.
- npm or yarn package manager installed.

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3.  Install the dependencies:

    ```bash
    npm install  # or yarn install
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev  # or yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## 📂 Project Structure

```
pokedex-react-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── RotatingText.jsx
│   │   └── SpotlightCard.jsx
│   ├── PokemonCards.jsx
│   ├── Pokemon.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 📸 Screenshots

(Screenshots will be added here)

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, feel free to reach out:

- [Your Name/Organization] - [Your Email/Website]

## 💖 Thanks

Thank you for checking out this project! We hope you find it useful and enjoyable. Happy coding! 🎉

This is written by [readme.ai](https://readme-generator-phi.vercel.app/).
