# ⚡ PokéTeam Builder — A Mini Pokémon Team Manager

### 🧠 Concept  
A fun and interactive mini web app where users can explore Pokémon cards (fetched from PokéAPI) and build their own **Pokémon Team**.  
The app supports full **CRUD** operations — users can create, view, update, and delete Pokémon from their team.

---

### 🧱 Features

#### 1. **Home Page (`/`)**
- Simple navigation bar with links:  
  - **Home**  
  - **My Team**  
- A button:  
  - **“View Pokémon”** → navigates to `/pokemon`

#### 2. **Pokémon List Page (`/pokemon`)**
- Fetches 20 Pokémon from PokéAPI  
- Displays each as a card with:  
  - Name  
  - Image  
  - “Add to Team” button  
- Clicking the button adds the Pokémon to the user's team (stored in localStorage or state array)  
- **C → Create**: Add new Pokémon to your team

#### 3. **My Team Page (`/team`)**
- Shows all Pokémon added by the user  
- Each card includes:  
  - “Edit Nickname” button → update name (**U → Update**)  
  - “Remove” button → delete from team (**D → Delete**)  
- Displays total number of Pokémon in the team (limit: 6 max)

#### 4. **Optional: Pokémon Details Page (`/pokemon/:id`)**
- Clicking a Pokémon card opens a detailed view (**R → Read**)

---

### 🔹 CRUD Logic

| Operation | Action                                      |
|-----------|---------------------------------------------|
| **C**     | Add Pokémon to localStorage team array      |
| **R**     | Display team and Pokémon details            |
| **U**     | Edit nickname or replace Pokémon            |
| **D**     | Remove Pokémon from team                    |

---

### 🛠️ Tech Stack & Concepts

- ✅ React Hooks (`useState`, `useEffect`)  
- ✅ Tailwind CSS for responsive card layouts  
- ✅ Routing with `react-router-dom`  
- ✅ LocalStorage for persistent team management  
- ✅ Conditional rendering & event handling  
- ✅ API integration using `fetch` or `axios`

---

### 🎯 Why Build This?

- Strengthen your React fundamentals  
- Practice real-world CRUD operations  
- Learn how to integrate external APIs  
- Build a creative, portfolio-worthy project  
- Have fun managing your dream Pokémon team!

---

💬 *Built with love, code, and a little bit of Poké-power.*  
