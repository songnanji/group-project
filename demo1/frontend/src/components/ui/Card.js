// src/components/ui/Card.js
import React from 'react';

function Card({ children, style }) {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
            padding: '20px',
            ...style
        }}>
            {children}
        </div>
    );
}

export default Card;
