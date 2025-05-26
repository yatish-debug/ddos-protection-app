# DDoS Protection Web Application

A cloud-based web application with built-in DDoS detection and mitigation capabilities.

## Features

- Real-time traffic monitoring and analysis
- IP reputation checking
- Behavioral anomaly detection
- Automated mitigation responses
- Dashboard for security monitoring
- Docker containerization
- Scalable architecture

## Technologies

- Frontend: React.js
- Backend: Node.js/Express
- Security: Custom DDoS detection algorithms
- Infrastructure: Docker, Docker Compose
- Monitoring: Prometheus, Grafana

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yatish-debug/ddos-protection-app.git
   cd ddos-protection-app
   cd client && npm install
   cd ../server && npm install
   Create .env files in both client and server directories with required environment variables.
   docker-compose up --build
