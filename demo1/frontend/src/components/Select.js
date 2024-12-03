// src/components/ui/Select.js
import React from 'react';

function Select({ options, onChange, style, defaultValue }) {
    return (
        <select onChange={onChange} style={{ ...defaultStyle, ...style }} defaultValue={defaultValue}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

const defaultStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    cursor: 'pointer',
};

export default Select;
