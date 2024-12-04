// src/components/MovieGrid.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieGrid() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleMovieClick = (movie) => { // 영화 상세 페이지에 id 전달
        navigate(`/movie/${movie.id}`, { state: { movie } });
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // 서버의 모든 영화를 가져오는 API 엔드포인트 호출
                const response = await fetch('/api/movies');
                if (!response.ok) {
                    throw new Error('영화 데이터를 불러오는데 실패했습니다');
                }
                const data = await response.json();
                
                // 최신순으로 정렬하고 상위 5개만 선택
                const sortedMovies = data
                    .sort((a, b) => b.year - a.year)
                    .slice(0, 50);
                
                setMovies(sortedMovies);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러: {error}</div>;
    }

    if (!movies || movies.length === 0) {
        return <div>영화가 없습니다.</div>;
    }

    return (
        <div>
            <h1>최신 영화</h1>
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
                gap: "20px",
                padding: "20px"
            }}>
                {movies.map((movie) => (
                    <div 
                        key={movie.id} 
                        onClick={() => handleMovieClick(movie)}
                        style={{ 
                            border: "1px solid #ddd", 
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={movie.largeCoverImage}
                            alt={movie.title}
                            style={{ 
                                width: "100%", 
                                height: "300px",
                                objectFit: "cover"
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
    );
}

export default MovieGrid;