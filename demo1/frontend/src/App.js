import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Signup from './components/Signup';
import Login from './components/Login';
import Board from './components/Board';
import MyPage from './components/MyPage';
import Reservation from './components/Reservation';
import Button from './components/ui/Button';
import './App.css';
import axios from "axios";
import SearchResult from './components/SearchResult'; // 추가된 부분
import MovieDetail from './components/MovieDetail';
import Random from './components/Random';
import RandomButton from "./components/RandomButton";
function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가
    const [movies, setMovies] = useState([]);

    // 페이지 로드 시 로그인 상태 유지
    useEffect(() => {

        const handlePopState = () => {
            window.location.reload(); // 새로고침
        };

        window.addEventListener("popstate", handlePopState);

        // 컴포넌트 언마운트 시 이벤트 제거
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };

        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/movies')
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                console.log('Fetched movies:', data); // 데이터 확인용
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
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

    const goToReservation = () => {
        window.open('http://www.cgv.co.kr/ticket/', '_blank');
    };

    //
    // 검색 처리 함수
    const onSearch = (title) => {
        axios
            .get(`http://localhost:8080/api/movies/search?title=${title}`)
            .then((response) => {
                navigate('/search', { state: { movies: response.data } }); // 검색 결과를 새로운 페이지에 전달
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };

    const onGenreSearch = (genre) => {
        axios
            .get(`http://localhost:8080/api/movies/search?genre=${genre}`)
            .then((response) => {
                navigate('/search', { state: { movies: response.data } });
            })
            .catch((error) => {
                console.error('Error fetching genre search results:', error);
            });
    };


    const goToRandom = () => {
        navigate('/random');
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
                            onSearch={onSearch} // Pass onSearch as a prop
                            onGenreSearch={onGenreSearch} // 새로운 함수 전달

                        />

                        <MovieGrid searchTerm={searchTerm} sortOption={sortOption} user={user} movies={movies} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                            <button onClick={goToBoard} className="board-button"> 게시판 이동</button>
                            <Button onClick={goToReservation}>예매하기</Button>
                            <Button onClick={goToRandom} className="board-button">랜덤 영화</Button>
                        </div>
                    </div>
                } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/board" element={<Board user={user?.username} />} />
                <Route path="/mypage" element={<MyPage user={user?.username} />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/search" element={<SearchResult />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/random" element={<Random />} />
            </Routes>
            <Footer />
        </div>
    );


}

export default App;