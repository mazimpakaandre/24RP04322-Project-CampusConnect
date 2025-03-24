# Use an official Node.js runtime as the base image
FROM node:18-slim

# Create app directory and set as working directory
WORKDIR /usr/src/app

# Create a non-root user
RUN groupadd -r appuser && useradd -r -g appuser -s /bin/false appuser

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Set ownership to non-root user
RUN chown -R appuser:appuser /usr/src/app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]