// src/components/ui/Card.js
import React from 'react';

function Card({ children, style }) {
    return (
        <div style={{ ...defaultStyle, ...style }}>
            {children}
        </div>
    );
}

const defaultStyle = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
};

export default Card;
