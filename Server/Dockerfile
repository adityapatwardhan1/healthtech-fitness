# Use an official Node.js runtime as a parent image
FROM node:14
# Set the working directory in the container
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install the dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 3000
# Start the server
#add backend code in server.jsx
CMD ["node", "server.jsx"]