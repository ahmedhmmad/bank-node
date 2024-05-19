# Use the official Node.js image.
FROM node:14

# Create and set the frontend directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the frontend files.
COPY . .

# Build the React app.
RUN npm run build

# Install serve to serve the built app.
RUN npm install -g serve

# Expose the frontend port.
EXPOSE 5000

# Command to run the frontend application.
CMD ["serve", "-s", "build"]
