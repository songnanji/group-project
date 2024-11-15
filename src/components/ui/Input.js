// src/components/ui/Input.js
import React from 'react';

function Input({ type = 'text', value, onChange, placeholder, style, name, required }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            required={required}
            style={{
                width: '90%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                ...style
            }}
        />
    );
}

export default Input;
