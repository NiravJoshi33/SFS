# Load the base image with official node runtime as a parent image

FROM node:20

# Set the working directory to /app

WORKDIR /app

# Copy the package.json and package-lock.json files

COPY package\*.json ./

# Install the dependencies

RUN npm install

# Copy the rest of the files to the working directory

COPY . .

# Build the app using webpack

RUN npm run build

# Expose the port to the host machine

EXPOSE 3000

# Start the app

CMD ["npx", "http-server", "dist", "-p", "3000"]
