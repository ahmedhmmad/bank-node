# Use the official Node.js image.
FROM node:latest

# Create and set the backend directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the backend files.
COPY . .

# Expose the backend port.
EXPOSE 3000

# Command to run the backend application.
CMD ["node", "app.js"]
