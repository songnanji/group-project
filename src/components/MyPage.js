import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyPage({ user }) {
    const [favorites, setFavorites] = useState([]);

    // localStorage에서 찜 목록 가져오기
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    return (
        <div style={{
            width: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        }}>
            <h2 style={{ textAlign: 'center' }}>My Page</h2>
            <div style={{
                textAlign: 'center',
                marginBottom: '20px',
            }}>
                <img
                    src={user?.profileImage || 'https://via.placeholder.com/100'}
                    alt="Profile"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ddd',
                    }}
                />
                <p>{user?.nickname || user.email}</p> 
            </div>
            <Link to="/profile-edit" style={{
                display: 'block',
                textAlign: 'center',
                padding: '10px',
                backgroundColor: '#007BFF',
                color: '#fff',
                borderRadius: '5px',
                textDecoration: 'none',
                marginBottom: '20px',
            }}>
                프로필 수정
            </Link>

            <div>
                <h3 style={{ textAlign: 'center' }}>찜 목록 미리보기</h3>
                {favorites.slice(0, 3).map((item) => ( // 최대 3개 미리보기
                    <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '5px 0',
                        borderBottom: '1px solid #ddd',
                    }}>
                        <span>{item.title}</span>
                    </div>
                ))}
                {favorites.length > 0 && (
                    <Link to="/favorites" style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        marginTop: '10px',
                    }}>
                        찜 목록 보기
                    </Link>
                )}
                {favorites.length === 0 && (
                    <p style={{ textAlign: 'center' }}>찜한 항목이 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default MyPage;




