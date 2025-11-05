import GlowingCards, { GlowingCard } from "../components/ui/glowing-cards";

const goals = [
  {
    glowColor: "#10b981", // Emerald
    title: "Authentication System",
    points: [
      "Add Login & Signup functionality for users.",
      "Use JWT (JSON Web Tokens) for secure authentication.",
      "Store user data in MongoDB instead of localStorage.",
      "Personalized experience — each user can save their own favorite Pokémon and teams.",
    ],
  },
  {
    glowColor: "#8b5cf6", // Violet
    title: "Database Integration",
    points: [
      "Move from localStorage to MongoDB + Mongoose.",
      "Create collections for users, pokemons, teams, and favorites.",
    ],
  },
  {
    glowColor: "#f59e0b", // Amber
    title: "Real-Time Pokémon Battle System",
    points: [
      "Build a real-time battle mode where two online players can compete.",
      "Use Socket.IO (WebSocket) for live interaction between users.",
      "Show both players’ Pokémon and HP status updates in real-time.",
      "Implement battle logic based on stats like HP, Speed, Type Advantage, etc.",
    ],
  },
  {
    glowColor: "#06b6d4", // Cyan
    title: "Global Community Features",
    points: [
      "Add chat or friend system — users can chat with other trainers.",
      "Show leaderboard of top trainers globally (based on battle wins).",
      "Display recent battles feed or activity history.",
    ],
  },
  {
    glowColor: "#ef4444", // Red
    title: "Improved UI & UX",
    points: [
      "Design a fully responsive Pokémon-style interface with animations.",
      "Use GSAP or Framer Motion for transitions.",
      "Add dark/light themes inspired by PokéCenter / Gym themes.",
      "Create a mobile-friendly layout for smoother touch interactions.",
    ],
  },
];

export default function FutureGoals() {
  return (
    <GlowingCards
      enableGlow
      glowRadius={30}
      glowOpacity={0.8}
      animationDuration={500}
      gap="2rem"
      responsive
    >
      {goals.map((goal, i) => (
        <GlowingCard key={i} glowColor={goal.glowColor} className="space-y-4">
          <h3 className="text-xl font-bold">{goal.title}</h3>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            {goal.points.map((point, j) => (
              <li key={j}>{point}</li>
            ))}
          </ul>
        </GlowingCard>
      ))}
    </GlowingCards>
  );
}
