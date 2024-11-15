// src/components/ui/Input.js
import React from 'react';

function Input({ value, onChange, placeholder, style, type = 'text' }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ ...defaultStyle, ...style }}
        />
    );
}

const defaultStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
};

export default Input;
