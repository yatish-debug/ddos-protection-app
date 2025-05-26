import React from 'react';
import { Line } from 'react-chartjs-2';

const Dashboard = ({ trafficData, alerts, isUnderAttack }) => {
    const chartData = {
        labels: trafficData.map((_, i) => i),
        datasets: [{
            label: 'Requests per second',
            data: trafficData.map(item => item.count),
            borderColor: isUnderAttack ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <div className="row">
            <div className="col-md-8">
                <div className="card mb-4">
                    <div className="card-header">
                        <h3>Traffic Monitoring</h3>
                    </div>
                    <div className="card-body">
                        <Line data={chartData} />
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card mb-4">
                    <div className="card-header bg-warning">
                        <h3>Security Alerts</h3>
                    </div>
                    <div className="card-body">
                        {alerts.length > 0 ? (
                            <ul className="list-group">
                                {alerts.map((alert, i) => (
                                    <li key={i} className="list-group-item">
                                        <strong>{alert.timestamp}</strong>: {alert.reason}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No active alerts</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
