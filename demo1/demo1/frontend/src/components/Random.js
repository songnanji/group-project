import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Random() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleMovieClick = (movie) => {
        navigate(`/movie/${movie.id}`, { state: { movie } });
    };

    const fetchRandomMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/movies/random', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('랜덤 영화를 불러오는데 실패했습니다');
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('올바른 형식의 데이터가 아닙니다');
            }
            setMovies(data);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button 
                onClick={fetchRandomMovies}
                className="board-button"
                style={{
                    marginRight: '10px'
                }}
            >
                랜덤 영화
            </button>

            {loading && <div>로딩 중...</div>}
            {error && <div style={{ color: 'red', margin: '10px 0' }}>에러: {error}</div>}
            
            {!loading && movies.length > 0 && (
                <div>
                    <h1>랜덤 영화</h1>
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
                        gap: "20px",
                        padding: "20px"
                    }}>
                        {movies.map((movie) => (
                            <div key={movie.id} style={{ 
                                border: "1px solid #ddd", 
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                            }}>
                                <img
                                    src={movie.largeCoverImage}
                                    alt={movie.title}
                                    style={{ 
                                        width: "100%", 
                                        height: "300px",
                                        objectFit: "cover",
                                        cursor: "pointer"   
                                    }}
                                    onClick={() => handleMovieClick(movie)}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                    }}
                                />
                                <div style={{ padding: "10px" }}>
                                    <h3 style={{ 
                                        fontSize: "16px", 
                                        margin: "0",
                                        textAlign: "center"
                                    }}>
                                        {movie.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Random; 