# CampusConnect

A modern student management system with microservices architecture, designed to handle student attendance and class management efficiently.

## What's Inside

- Backend API service for core functionality
- Student attendance microservice
- Message queue for real-time updates
- Containerized with Docker
- Kubernetes deployment ready
- Automated CI/CD pipeline

## Getting Started

### What You Need

- Node.js (version 18 or higher)
- Docker and Docker Compose
- Git

### Quick Start

1. Clone the project:
   ```bash
   git clone [your-repository-url]
   ```

2. Start with Docker Compose:
   ```bash
   docker-compose up
   ```

   This will start:
   - Backend service (port 3000)
   - Student microservice (port 3001)
   - MySQL database
   - RabbitMQ message queue

### Development Setup

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install microservice dependencies:
   ```bash
   cd microservice
   npm install
   ```

3. Create a `.env` file in both backend and microservice folders with:
   ```
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=campusconnect
   DB_PASSWORD=securepassword
   DB_NAME=campusconnect
   RABBITMQ_URL=amqp://localhost:5672
   ```

4. Start services in development mode:
   ```bash
   # In backend folder
   npm run dev

   # In microservice folder
   npm run dev
   ```

## Testing

Run tests for each service:
```bash
# For backend
cd backend
npm test

# For microservice
cd microservice
npm test
```

## Deployment

### Using Kubernetes

1. Apply Kubernetes configurations:
   ```bash
   kubectl apply -f k8s/
   ```

2. Verify deployments:
   ```bash
   kubectl get pods
   kubectl get services
   ```

### Using CI/CD Pipeline

The project includes:
- GitHub Actions for testing and building Docker images
- Jenkins pipeline for Kubernetes deployment
- Automated security scanning with Trivy

Just push to the main branch, and the pipeline will:
1. Run tests
2. Build Docker images
3. Push to Docker Hub
4. Deploy to Kubernetes

## API Endpoints

### Backend Service (Port 3000)

- `GET /health`: Health check
- `GET /api/students`: List students

### Student Microservice (Port 3001)

- `GET /health`: Health check
- `POST /api/attendance`: Record student attendance

## Security Features

- Helmet.js for HTTP security
- CORS enabled
- Non-root Docker containers
- Kubernetes security contexts
- Automated vulnerability scanning

## Need Help?

For issues and feature requests, please use the GitHub issue tracker.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request