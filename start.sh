#!/bin/bash

# Set the correct Node.js version path
export PATH="/opt/homebrew/opt/node@18/bin:$PATH"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js using: brew install node@18"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    exit 1
fi

echo "Starting Testamentegenerator..."
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""
echo "The application will open at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm start
