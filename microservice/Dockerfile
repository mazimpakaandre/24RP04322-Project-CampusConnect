# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Create app directory and set as working directory
WORKDIR /usr/src/app

# Add a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Set ownership to non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]