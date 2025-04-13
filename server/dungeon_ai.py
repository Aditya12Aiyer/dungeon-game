import subprocess

# Read the book files and combine them into a structured prompt
def build_prompt_with_books(user_log, race, char_class):
    try:
        with open("book1.txt", "r", encoding="utf-8") as f:
            book1 = f.read()
    except FileNotFoundError:
        book1 = "book1.txt not found."

    try:
        with open("book2.txt", "r", encoding="utf-8") as f:
            book2 = f.read()
    except FileNotFoundError:
        book2 = "book2.txt not found."

    try:
        with open("book3.txt", "r", encoding="utf-8") as f:
            book3 = f.read()
    except FileNotFoundError:
        book3 = "book3.txt not found."

    # Build the full prompt including the books and the user log
    return f"""
You are a Dungeon Master running a fantasy text adventure. Use the official Dungeons & Dragons rules contained in the following books to guide all story narration and mechanics.

The player is a {race} {char_class}.

📘 Book 1 (Race/Class Info or Player Basics):
{book1}

📙 Book 2 (Spells, Combat, Skills, or Mechanics):
{book2}

📗 Book 3 (DM Guidelines, Encounters, or Additional Lore):
{book3}

🧾 Game log so far:
{user_log}

Now narrate the next part of the story, following these rules and building a rich, rule-accurate experience.
"""

def get_llama3_response(prompt):
    command = ['ollama', 'run', 'llama3']

    try:
        # Ensure the encoding is set to 'utf-8' to support emojis and special characters
        result = subprocess.run(
            command,
            input=prompt,
            capture_output=True,
            text=True,
            check=True,
            timeout=30,
            encoding='utf-8'  # Set encoding to utf-8 to handle special characters (e.g., emojis)
        )

        # Log the raw output for debugging purposes
        print("Raw Llama3 output:", result.stdout)

        # Process the output by removing any unwanted prefixes or extra data
        output = result.stdout.strip()

        # If the output has a prefix we don’t need, clean it
        if output.startswith("> llama3"):
            output = output.split("\n", 1)[-1].strip()

        return output

    except subprocess.TimeoutExpired:
        print("Error: Llama3 took too long to respond.")
        return "Llama3 took too long to respond."
    
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e}")
        print(f"stderr: {e.stderr}")
        return f"Error with Llama3 response: {e.stderr}"

    except Exception as e:
        print(f"Unexpected error: {e}")
        return f"Unexpected error: {e}"

