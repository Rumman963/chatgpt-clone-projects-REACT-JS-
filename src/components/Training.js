import React, { useState, useEffect } from 'react';
import trainingService from '../services/trainingService';
import '../styles/Training.css';

const Training = () => {
    const [trainingData, setTrainingData] = useState([]);
    const [jobId, setJobId] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                setTrainingData(data);
                setError(null);
            } catch (err) {
                setError("Invalid JSON format");
            }
        };

        reader.readAsText(file);
    };

    const startTraining = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await trainingService.startTraining(trainingData);
            setJobId(result.jobId);
            setStatus(result.status);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const checkStatus = async () => {
        if (!jobId) return;

        try {
            const result = await trainingService.checkTrainingStatus(jobId);
            setStatus(result.status);

            if (result.status === 'succeeded' && result.model) {
                const evaluation = await trainingService.evaluateModel(result.model, trainingData.slice(0, 5));
                setMetrics(evaluation.metrics);
            } else if (result.status === 'failed') {
                setError(result.error?.message || 'Training failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        let interval;
        if (jobId && status !== 'succeeded' && status !== 'failed') {
            interval = setInterval(checkStatus, 5000);
        }
        return () => clearInterval(interval);
    }, [jobId, status]);

    return (
        <div className="training-container">
            <h1>Model Training</h1>
            
            <div className="upload-section">
                <h2>Upload Training Data</h2>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="file-input"
                />
                {error && <div className="error-message">{error}</div>}
            </div>

            {trainingData.length > 0 && (
                <div className="training-info">
                    <p>Training examples loaded: {trainingData.length}</p>
                    <button
                        onClick={startTraining}
                        disabled={isLoading || jobId}
                        className="start-button"
                    >
                        {isLoading ? 'Starting...' : 'Start Training'}
                    </button>
                </div>
            )}

            {jobId && (
                <div className="status-section">
                    <h2>Training Status</h2>
                    <p>Job ID: {jobId}</p>
                    <p>Status: {status}</p>
                    {metrics && (
                        <div className="metrics-section">
                            <h3>Evaluation Metrics</h3>
                            <p>Accuracy: {(metrics.accuracy * 100).toFixed(2)}%</p>
                            <p>Average Confidence: {(metrics.averageConfidence * 100).toFixed(2)}%</p>
                            <p>Total Examples: {metrics.totalExamples}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Training; 