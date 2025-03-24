# CampusConnect - Student Management System

A comprehensive web application for managing student identifications and class records, built with Node.js, microservices architecture, and modern DevOps practices.

## Project Overview

CampusConnect is a containerized student management system that demonstrates a complete DevOps lifecycle, including:

- Node.js backend with REST API
- Microservice architecture
- MySQL database integration
- Docker containerization
- Kubernetes orchestration
- CI/CD with GitHub Actions and Jenkins
- NGINX reverse proxy

## Architecture

- **Backend**: Node.js REST API for core student management functionality
- **Microservice**: Dedicated service for specific student-related operations
- **Database**: MySQL for persistent data storage
- **Reverse Proxy**: NGINX for load balancing and routing

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Containerization**: Docker
- **Orchestration**: Kubernetes (K8s)
- **CI/CD**: GitHub Actions, Jenkins
- **Proxy**: NGINX
- **Version Control**: Git, GitHub

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/24RP04322_Project_CampusConnect.git
   cd 24RP04322_Project_CampusConnect
   ```

2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../microservice && npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start development environment:
   ```bash
   docker-compose up -d
   ```

## Project Structure

```
24RP04322_Project_CampusConnect/
├── backend/               # Main Node.js backend application
├── microservice/         # Student-related microservice
├── k8s/                  # Kubernetes configuration files
├── jenkins/             # Jenkins pipeline configuration
├── .github/             # GitHub Actions workflows
└── docker-compose.yml   # Local development environment
```

## Security Measures

- Secure Docker images with minimal base
- Non-root user containers
- Environment variables for sensitive data
- Input validation and sanitization
- Secure secret management

## Deployment

The application is deployed using a combination of GitHub Actions and Jenkins:

1. GitHub Actions handles:
   - Code testing
   - Docker image building
   - Image security scanning
   - Container registry pushing

2. Jenkins manages:
   - Kubernetes deployment
   - Environment configuration
   - Production rollouts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.