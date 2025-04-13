import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState(["You awaken in a damp stone chamber... \n If you're confused, type in 'What are my stats' to see what they are, your bonuses for being a certain race or class, and even your main weapon in combat to use on your adventure. "]);
  const [loading, setLoading] = useState(false);
  const [race, setRace] = useState("");
  const [charClass, setCharClass] = useState("");
  const [step, setStep] = useState(1); // To track the current step in the form
  const backgroundStyle = {
    backgroundImage: "url('/images/raw.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    color: "#f5f5f5",
    fontFamily: "monospace",
    padding: "2rem",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLog = [...log, `🧍 You: ${input}`]; // Fixed string interpolation here
    setLog(newLog);
    setInput("");
    setLoading(true);

    try {
      const prompt = newLog.join("\n"); // Create the full prompt with context

      const res = await fetch("https://dungeon-game-server-njn8.onrender.com/api/dungeon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          race,
          class: charClass,
        }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (data && data.response) {
        setLog([...newLog, `🧠 Dungeon Master: ${data.response}`]); // Fixed string interpolation here
      } else {
        setLog([...newLog, "❌ Error: No response from Dungeon Master."]);
      }
    } catch (err) {
      setLog([...newLog, "❌ Error: Failed to fetch response."]);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers for race and class selection
  const handleRaceSelection = (raceChoice) => {
    setRace(raceChoice);
    setStep(2); // Move to class selection after race selection
  };

  const handleClassSelection = (classChoice) => {
    setCharClass(classChoice);
    setStep(3); // Ready to start the adventure
  };

  return (
    <div
    style={{
      ...backgroundStyle,
      padding: "2rem",
      fontFamily: "Mauline Display, serif", // Ensure the font is loaded
      fontWeight: 700, // Correct property name (camelCase)
      fontSize: "1.5rem",
      color: "#FFFFFF",
      minHeight: "100vh",
    }}
>

      <h1>🧙‍♂️ Dungeon Adventure</h1>

      <div style={{ whiteSpace: "pre-wrap", marginBottom: "2rem", marginLeft: "5rem" }}>
        {log.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        {loading && <div>🤖 The Dungeon Master is thinking...</div>}
      </div>

      {step === 1 && (
        <div>
          <h2>What race are you?</h2>
          <button onClick={() => handleRaceSelection("Dwarf")}>Dwarf</button>
          <button onClick={() => handleRaceSelection("Elf")}>Elf</button>
          <button onClick={() => handleRaceSelection("Human")}>Human</button>
          <button onClick={() => handleRaceSelection("Dragonborn")}>Dragonborn</button>
          <button onClick={() => handleRaceSelection("Orc")}>Orc</button>
          <button onClick={() => handleRaceSelection("Halfling")}>Halfling</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>What class are you?</h2>
          <button onClick={() => handleClassSelection("Fighter")}>Fighter</button>
          <button onClick={() => handleClassSelection("Rogue")}>Rogue</button>
          <button onClick={() => handleClassSelection("Wizard")}>Wizard</button>
          <button onClick={() => handleClassSelection("Bard")}>Bard</button>
          <button onClick={() => handleClassSelection("Cleric")}>Cleric</button>
          <button onClick={() => handleClassSelection("Monk")}>Monk</button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you do?"
            style={{ padding: "0.5rem", width: "70%", fontSize: "1rem" }}
          />
          <button type="submit" style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
