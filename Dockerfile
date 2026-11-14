
# Use the official Node.js 24 image
FROM node:24-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source code
COPY src/ ./src/

# Copy frontend files
COPY public/ ./public/

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
