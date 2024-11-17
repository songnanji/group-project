import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Signup from './components/Signup';
import Login from './components/Login';
import MyPage from './components/MyPage';  // 마이페이지 컴포넌트
import ProfileEdit from './components/ProfileEdit'; // 프로필 수정 컴포넌트 
import Favorites from './components/Favorites'; // 찜 목록 컴포넌트


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
        navigate('/mypage');  // 로그인 후 마이페이지로 이동
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        navigate('/');  // 로그아웃 후 홈으로 이동
    };

    const handleUpdateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
                <Route 
                    path="/mypage" 
                    element={<MyPage user={user} onUpdateUser={handleUpdateUser} />} 
                />
                <Route 
                    path="/profile-edit" 
                    element={<ProfileEdit user={user} onUpdateUser={handleUpdateUser} />}    
                /> {/* 프로필 수정 경로 추가 */}
                <Route path="/favorites" element={<Favorites />} /> {/* 찜 목록 추가 */}
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

