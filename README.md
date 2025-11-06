# PokéTeam Builder 🚀

A dynamic React application that allows users to build their ultimate Pokémon team! Browse through a comprehensive list of Pokémon, add them to your favorites, and assemble your dream team. With features like theme switching, search functionality, and persistent data storage, PokéTeam Builder offers a seamless and engaging experience for Pokémon enthusiasts.

## 🌟 Key Features

- **Extensive Pokémon Database:** Browse through a vast collection of Pokémon fetched directly from the PokéAPI.
- **Team Builder:** Create and manage your Pokémon team, limited to a maximum of 6 Pokémon.
- **Favorites List:** Keep track of your favorite Pokémon for easy access.
- **Search Functionality:** Quickly find specific Pokémon by name, type, or ability.
- **Theme Switching:** Toggle between light and dark themes for a personalized experience.
- **Persistent Data:** Your theme preferences, favorite Pokémon, and team are saved using `localStorage`.
- **Responsive Design:** Enjoy a seamless experience on various devices.
- **About Us Page:** Learn more about the application and the developer.

## 🛠️ Tech Stack

| Category      | Technology                | Description                                                                 |
|---------------|---------------------------|-----------------------------------------------------------------------------|
| **Frontend**  | React                     | JavaScript library for building user interfaces.                            |
|               | React Router DOM          | Library for handling routing and navigation within the application.          |
|               | Tailwind CSS              | CSS framework for styling the application.                                  |
|               | DaisyUI                   | Component library built on top of Tailwind CSS.                             |
|               | React Icons               | Library for using icons in React components.                                |
|               | Motion                    | Animation library for creating smooth transitions.                           |
| **Build Tool**| Vite                      | Build tool for fast development and optimized production builds.            |
| **Other**     | PokéAPI                   | RESTful API providing Pokémon data.                                         |
| **Linting**   | ESLint                    | JavaScript linter for code quality.                                         |

## 📦 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (version >= 18)
- npm (or yarn or pnpm)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## 💻 Usage

1.  **Browse Pokémon:** Use the main page to view a list of Pokémon.
2.  **Search:** Use the search bar in the Navbar to find specific Pokémon.
3.  **Add to Favorites:** Click the heart icon on a Pokémon card to add it to your favorites.
4.  **Build Your Team:** Click the plus icon on a Pokémon card to add it to your team (maximum 6).
5.  **View Favorites:** Navigate to the "My Favorites" page to see your favorite Pokémon.
6.  **View Team:** Navigate to the "My Team" page to see your current team.
7.  **Switch Theme:** Use the theme toggle in the Navbar to switch between light and dark themes.

## 📂 Project Structure

```
poketeam-builder/
├── src/
│   ├── components/
│   │   ├── FutureGoals.jsx
│   │   ├── DarkBackground.jsx
│   │   ├── LightBackground.jsx
│   │   ├── Navbar.jsx
│   │   ├── RotatingTitle.jsx
│   │   ├── SpotlightCard.jsx
│   ├── lib/
│   │   ├── utils.js
│   ├── About.jsx
│   ├── App.jsx
│   ├── Footer.jsx
│   ├── MyFavorites.jsx
│   ├── MyTeam.jsx
│   ├── Pokemon.jsx
│   ├── PokemonCards.jsx
│   ├── main.jsx
│   ├── index.css
├── vite.config.js
├── package.json
├── README.md
```

## 🔮 Future Scope

PokéTeam Builder is designed with scalability and long-term vision in mind. Here are some exciting features planned for future development:

### 🔐 1. Authentication System

- Implement user Login & Signup functionality.
- Use JWT (JSON Web Tokens) for secure authentication.
- Store user data in MongoDB instead of localStorage.
- Enable personalized experiences — each user can manage their own favorites and teams.

### 🗄️ 2. Database Integration

- Migrate from localStorage to a persistent backend using MongoDB + Mongoose.
- Define collections for:
  - `users` (profile, email, password)
  - `pokemons` (data fetched from PokéAPI)
  - `teams` (custom team creation per user)
  - `favorites` (liked Pokémon list)

### ⚔️ 3. Real-Time Pokémon Battle System

- Introduce a live battle mode where two users can compete in real-time.
- Use Socket.IO (WebSocket) for real-time communication.
- Design a battle arena UI showing both players’ Pokémon, HP, and status.
- Implement battle logic based on stats like HP, Speed, Weight, and Type Advantages.

### 🌐 4. Global Community Features

- Add a chat or friend system for trainers to connect.
- Display a global leaderboard based on battle wins.
- Show recent battles or activity feed for community engagement.

### 🎨 5. Enhanced UI & UX

- Build a fully responsive, Pokémon-themed interface.
- Add immersive animations using GSAP or Framer Motion.
- Introduce PokéCenter/Gym-inspired dark/light themes.
- Optimize for mobile-first experience with smooth touch interactions.

## 📸 Screenshots

(Screenshots will be added here)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 💖 Thanks

Thank you for checking out PokéTeam Builder! We hope you enjoy building your ultimate Pokémon team.
