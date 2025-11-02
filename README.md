# Recipe Builder & Cooking Simulator

A React + Redux Toolkit frontend application for upliance.ai that simulates a smart cooking experience.

## 🚀 Features

### Recipe Builder (/create)
- Create recipes with title, difficulty, ingredients, and steps
- Add/remove/reorder cooking steps and instruction steps
- Type-specific validation (temperature, speed, ingredients)
- Real-time validation and error feedback
- localStorage persistence

### Recipes List (/recipes)
- View all saved recipes with difficulty chips and time indicators
- Filter by difficulty (multi-select)
- Sort by total time (ascending/descending)
- Favorite toggle functionality
- Click to start cooking sessions

### Cooking Session (/cook/:id)
- Linear cooking flow with timer-based progression
- Start/Pause/Resume/STOP controls
- Auto-advance when step time completes
- Real-time circular progress for current step
- Context chips showing temperature/speed/ingredients
- Timeline showing completed/current/upcoming steps
- Overall progress bar with remaining time

### Global Mini Player
- Visible on all routes except active cooking session
- Shows active session with tiny progress indicator
- Quick pause/resume/stop controls
- Click to navigate to full cooking session

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Material-UI v5** for components
- **React Router** for navigation
- **localStorage** for data persistence

## 📦 Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

## 🎯 Usage

1. **Create Recipe:** Click "Create Recipe" to build a new recipe with ingredients and steps
2. **View Recipes:** Browse your saved recipes with filtering and sorting options
3. **Start Cooking:** Click "Start Cooking" on any recipe to begin a guided cooking session
4. **Mini Player:** Monitor active cooking sessions from any page

## 🔧 Key Features

- **Validation:** Comprehensive input validation with real-time feedback
- **Persistence:** All recipes saved to localStorage under `recipes:v1`
- **Timer Logic:** Drift-safe timing using `Date.now()` deltas
- **Single Session:** Only one active cooking session allowed at a time
- **Auto-advance:** Steps automatically progress when time expires
- **Responsive:** Mobile-friendly Material-UI design

## 📝 Data Models

### Recipe
- Title, difficulty, ingredients, steps
- Derived fields: totalTimeMinutes, totalIngredients, complexityScore
- Favorite toggle and creation timestamp

### Cooking Session
- In-memory state (cleared on reload)
- Current step tracking with elapsed time
- Pause/resume functionality with time compensation

## 🚫 Constraints

- Minimum 1 ingredient and 1 step per recipe
- Cooking steps: temperature 40-200°C, speed 1-5
- Instruction steps: minimum 1 ingredient required
- Title minimum 3 characters
- All quantities must be > 0