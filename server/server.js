require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const WebSocket = require('ws');
const { createServer } = require('http');
const { analyzeRequest } = require('./security/analyzer');
const { checkIpReputation } = require('./security/ipReputation');
const { logTraffic } = require('./monitoring/trafficLogger');

const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => WHITELISTED_IPS.includes(req.ip)
});

app.use('/api/', apiLimiter);

app.use((req, res, next) => {
    const analysisResult = analyzeRequest(req);
    logTraffic(req, analysisResult);
    
    if (analysisResult.isMalicious) {
        broadcastAlert({
            type: 'ddos_attempt',
            ip: req.ip,
            timestamp: new Date().toISOString(),
            reason: analysisResult.reasons.join(', ')
        });
        return res.status(429).json({ error: 'Request blocked' });
    }
    next();
});

const clients = new Set();
wss.on('connection', (ws) => {
    clients.add(ws);
    ws.on('close', () => clients.delete(ws));
});

function broadcastAlert(alert) {
    const message = JSON.stringify({ type: 'alert', payload: alert });
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

app.get('/api/traffic', (req, res) => {
    res.json(getTrafficData());
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

setInterval(() => {
    const trafficUpdate = generateTrafficData();
    const message = JSON.stringify({ type: 'traffic', payload: trafficUpdate });
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}, 1000);
