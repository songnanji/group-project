// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/Button';

function Header({ isLoggedIn, onLogout, username }) {
    const navigate = useNavigate();

    return (
        <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
        }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>Movie On the TOP</h1>
            </Link>
            <div>
                {isLoggedIn ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>{username}님 환영합니다.</span>
                        <Button onClick={onLogout}>로그아웃</Button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button onClick={() => navigate('/login')}>로그인</Button>
                        <Button onClick={() => navigate('/signup')}>회원가입</Button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;