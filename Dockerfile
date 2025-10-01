# Development Dockerfile for ErgoWellness
# This provides a consistent development environment

FROM node:20-bullseye

# Install system dependencies for Electron
RUN apt-get update && apt-get install -y \
    libgtk-3-0 \
    libnotify4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    xvfb \
    libgbm1 \
    libasound2 \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Default command
CMD ["npm", "run", "dev"]

