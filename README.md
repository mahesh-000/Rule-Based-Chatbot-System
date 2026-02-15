# CoreChat: Rule-Based Chatbot System

A premium, conversational AI system built with natural language processing fundamentals using pattern-matching logic. This project is designed as a foundational system for academic submissions (MCA/BCA/Engineering) or as a base for future AI integration.

## 🌟 Features

- **Advanced Rule Engine**: Implements priority scoring where multiple keyword matches increase the confidence of the intent.
- **Randomized Response System**: Personality-driven logic that randomly selects from a pool of responses to prevent robotic repetition.
- **Mood Detection & Empathy Layer**: Simple sentiment analysis that detects sad or happy keywords and prepends empathetic responses.
- **Time-Aware Intelligence**: Dynamically adjusts responses based on system time (e.g., reacting if "Good Morning" is said at night).
- **Premium UI**: Modern glassmorphism design with sleek animations and responsive layout.
- **Modular Data Management**: Clean separation between logic and the extended `rules.json` cluster structure.

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Glassmorphism), JavaScript (ESM)
- **Build Tool**: Vite
- **Logic**: Custom Rule Engine (JavaScript)
- **Data Storage**: JSON

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository or extract the project files.
2. Navigate to the project directory:
   ```bash
   cd CoreChat
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project
To start the development server:
```bash
npm run dev
```
Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Running Tests
To verify the engine logic:
```bash
node tests/engine.test.js
```

## 📁 Project Structure

```text
├── data/
│   └── rules.json      # Predefined conversational rules
├── src/
│   └── engine.js       # Core rule-matching logic
├── tests/
│   └── engine.test.js  # Unit tests for the engine
├── index.html          # Main entry point
├── main.js             # UI Glue and event handling
├── style.css           # Premium styling
└── package.json        # Dependencies and scripts
```

## 📝 Rule Format

Rules are stored in `data/rules.json` using the following structure:
```json for exm......
{
  "intent": "fees",
  "patterns": ["fees", "cost", "price"],
  "response": "The fee structure details are available on the website."
}
```

## 📄 License
This project is for academic and educational purposes.
