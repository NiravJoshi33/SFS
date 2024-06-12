FROM node:22.2.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN apk add --update python3
RUN export PATH="/usr/bin/python3:$PATH"
RUN apk add --update py3-pip
RUN apk add --update gcc g++ make
RUN npm install

# Bundle app source
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port 2567
EXPOSE 2567

# Start the app
CMD [ "npm", "start" ]
