# Dungeons and Dragons!

A conversational, story-driven Dungeons & Dragons experience powered by LLaMA 3 and Flask + React. 
Create a character, go on adventures, and let AI be your Dungeon Master!

## 🎥 Demo
[Click here to watch the demo on YouTube](https://www.youtube.com/watch?v=45zSu8oOtbo)

## Features
- 🧠 AI-generated storytelling using LLaMA 3
- 🎲 Dice-based combat decisions
- 👤 Character creation with race/class selection
- 🧙 DM-style narration and NPC encounters

## Tech Stack
- Frontend: React.js
- Backend: Flask (Python)
- AI: LLaMA 3 via Ollama
- Testing: Postman

## Installation Instructions
1. Clone the repo:
2. Run the Flask backend: cd server pip install -r requirements.txt python app.py
3. Start the React frontend: cd client npm install npm start

## Usage
1. Choose your race and class
2. Interact with the AI DM through the prompt box
3. Make decisions, fight enemies, and explore dungeons!

## ⚠️ Important Notes
- The React and Flask sides are currently connected to Render webpages, but these URLs do not currently work. If testing the code make sure to switch to a localhost server (flask port 10000) to properly test out the code. We are still working on getting the program up on a public webpage.
- Make sure Ollama is running before launching the Flask backend.
- The AI model (LLaMA 3) runs locally and does **not** access the internet.
- Story accuracy may vary depending on prompt phrasing.
- Character stats are not strictly enforced — more of a narrative guideline.


