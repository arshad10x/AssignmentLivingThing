import React from 'react';
import EnergyChart from './components/EnergyChart';
import ChartAccessForm from './components/ChartAccessForm';
import "./App.css";

function App() {
    return (
        <div className="App">
            <div className="container">
                <EnergyChart />
                <ChartAccessForm />
            </div>
        </div>
    );
}

export default App;