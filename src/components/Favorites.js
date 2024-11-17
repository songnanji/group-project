import React, { useState, useEffect } from 'react';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    // 초기화: localStorage에서 찜 목록 가져오기
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favorites.filter((item) => item.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // localStorage 업데이트
    };

    return (
        <div style={{
            width: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        }}>
            <h2 style={{ textAlign: 'center' }}>찜 목록</h2>
            {favorites.length === 0 ? (
                <p style={{ textAlign: 'center' }}>찜한 영화가 없습니다.</p>
            ) : (
                <ul style={{ padding: '0', listStyleType: 'none' }}>
                    {favorites.map((item) => (
                        <li key={item.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            borderBottom: '1px solid #ddd',
                        }}>
                            <span>{item.title}</span>
                            <button
                                onClick={() => handleRemoveFavorite(item.id)}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Favorites;
