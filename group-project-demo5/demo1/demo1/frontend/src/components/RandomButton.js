import React from 'react';

function RandomButton({ onRandomClick }) {
    return (
        <button 
            onClick={onRandomClick}
            className="board-button"

        >

            랜덤 영화
        </button>
    );
}

export default RandomButton; 