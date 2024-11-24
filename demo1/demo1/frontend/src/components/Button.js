// src/components/ui/Button.js
import React from 'react';

function Button({ children, onClick, style, type = 'button' }) {
    return (
        <button type={type} onClick={onClick} style={{ ...defaultStyle, ...style }}>
            {children}
        </button>
    );
}

const defaultStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

export default Button;
