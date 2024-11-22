import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [user, setUser] = useState(null);

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

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Header 
                isLoggedIn={!!user} 
                onLogout={handleLogout} 
                username={user?.username}
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
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
