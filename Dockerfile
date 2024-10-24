# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy built files from the builder stage
COPY --from=builder /usr/src/app ./

# Install only production dependencies
RUN npm install --only=production

# Expose port
EXPOSE 8080

# Start the app
CMD ["npm", "run", "start:prod"]
