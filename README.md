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

  Clone the repository:
1. git clone https://github.com/yatish-debug/ddos-protection-app.git
2.  cd ddos-protection-app
3.  cd client && npm install
4.  cd ../server && npm install
5.  @ Create .env files in both client and server directories with required environment variables
 
6.  docker-compose up --build
  ##  Configuration
     Configure these environment variables:
     server.env
     {
       PORT=3000
       WHITELISTED_IPS="127.0.0.1,192.168.1.1"
       MAX_REQUESTS_PER_MINUTE=100
     }
     client.env
     {
         REACT_APP_API_URL=http://localhost:3000
         REACT_APP_WS_URL=ws://localhost:3000
     }
## Usage
1.Access the application at http://localhost:3000

2.The dashboard will show real-time traffic and security alerts

3.To simulate attacks, use tools like JMeter or custom test scripts

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 6. Push Final Changes
Make changes And Improve the Project
# Add the README
git add README.md

# Commit
git commit -m "Add comprehensive README with installation and usage instructions"

# Push
git push origin main
