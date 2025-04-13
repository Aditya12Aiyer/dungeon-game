#!/bin/bash

# Download and install Ollama
echo "Installing Ollama..."
curl -fsSL https://ollama.com/download/ollama-linux-x64.tar.gz | tar -xz -C /usr/local/bin/

# Optional: Check if Ollama was installed successfully
if command -v ollama &> /dev/null
then
    echo "Ollama installation was successful!"
else
    echo "Ollama installation failed!"
    exit 1
fi
