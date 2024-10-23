import React, { useState } from 'react';
import { addChartData } from '../services/api';
import './ChartAccessForm.css'; 

const ChartAccessForm = () => {
  const [totalKwh, setTotalKwh] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');
    
    // Validate form inputs
    if (!totalKwh || !createdAt) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const newData = {
        total_kwh: totalKwh,
        createdAt: new Date(createdAt).toISOString(),
      };

      const response = await addChartData(newData);

      if (response) {
        setSuccessMessage('Chart data logged successfully!');
        setTotalKwh('');
        setCreatedAt('');
      } else {
        setErrorMessage('Failed to log chart data.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="chart-access-form">
      <h2>Log Chart Data Access</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="totalKwh">Total kWh:</label>
          <input
            id="totalKwh"
            type="number"
            value={totalKwh}
            onChange={(e) => setTotalKwh(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="createdAt">Accessed At (Date):</label>
          <input
            id="createdAt"
            type="datetime-local"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log Access</button>
      </form>
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ChartAccessForm;