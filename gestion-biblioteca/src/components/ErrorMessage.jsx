import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;