// src/components/ui/Select.js
import React from 'react';

function Select({ options, value, onChange, style, name, required }) {
    return (
        <select
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            style={{
                width: '90%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                ...style
            }}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Select;
