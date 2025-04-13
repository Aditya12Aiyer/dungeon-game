#!/bin/bash

# Download and install Ollama
echo "Installing Ollama..."
# install_ollama.sh
curl -fsSL https://ollama.com/install.sh | sh


# Optional: Check if Ollama was installed successfully
if command -v ollama &> /dev/null
then
    echo "Ollama installation was successful!"
else
    echo "Ollama installation failed!"
    exit 1
fi
