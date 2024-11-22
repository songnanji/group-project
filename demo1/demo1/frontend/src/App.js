import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Signup from './components/Signup';
import Login from './components/Login';
import Board from './components/Board';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // 페이지 로드 시 로그인 상태 유지
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const goToBoard = () => {
        navigate('/board');
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Header 
                isLoggedIn={!!user} 
                onLogout={handleLogout} 
                userEmail={user?.email}
            />
            <Routes>
                <Route path="/" element={
                    <div>
                        <SearchBar 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />
                        <MovieGrid searchTerm={searchTerm} sortOption={sortOption} user={user} />
                    </div>
                } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/board" element={<Board user={user} />} />
            </Routes>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <a
                    href="http://www.cgv.co.kr/ticket/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking-button"
                >
                    예매하기
                </a>
                <button onClick={goToBoard} className="board-button">게시판 이동</button>
            </div>
            <Footer />          
        </div>
    );
}

export default App;
