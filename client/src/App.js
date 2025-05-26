import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
    const [trafficData, setTrafficData] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [isUnderAttack, setIsUnderAttack] = useState(false);

    useEffect(() => {
        fetchTrafficData();
        const ws = new WebSocket(`wss://${window.location.host}/realtime`);
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'traffic') {
                setTrafficData(prev => [...prev.slice(-50), data.payload]);
            } else if (data.type === 'alert') {
                setAlerts(prev => [data.payload, ...prev.slice(0, 9)]);
                setIsUnderAttack(true);
            } else if (data.type === 'all-clear') {
                setIsUnderAttack(false);
            }
        };

        return () => ws.close();
    }, []);

    const fetchTrafficData = async () => {
        try {
            const response = await axios.get('/api/traffic');
            setTrafficData(response.data);
        } catch (error) {
            console.error('Error fetching traffic data:', error);
        }
    };

    return (
        <div className={`container-fluid ${isUnderAttack ? 'bg-danger bg-opacity-10' : ''}`}>
            <h1 className="text-center my-4">DDoS Protected Application</h1>
            <Dashboard trafficData={trafficData} alerts={alerts} isUnderAttack={isUnderAttack} />
        </div>
    );
}

export default App;
