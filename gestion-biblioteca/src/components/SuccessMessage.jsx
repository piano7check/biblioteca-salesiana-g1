import React from "react";
import PropTypes from "prop-types";
import { FaCheckCircle } from "react-icons/fa";

const SuccessMessage = ({ message, onClose }) => {
    return (
        <div className="success-message">
            <div className="success-content">
                <FaCheckCircle className="success-icon" />
                <span className="success-text">{message}</span>
            </div>
            {onClose && (
                <button className="success-close-btn" on onClick={onClose}>
                    &times;
                </button>
            )}
        </div>
    );
};

SuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

export default SuccessMessage;