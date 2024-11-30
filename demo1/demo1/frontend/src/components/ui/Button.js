// src/components/ui/Button.js
import React from 'react';

function Button({ children, onClick, type = 'button', style }) {
    return (
        <button
            type={type}
            onClick={onClick}
            style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#007BFF',
                color: '#fff',
                cursor: 'pointer',
                ...style
            }}
        >
            {children}
        </button>
    );
}

export default Button;
