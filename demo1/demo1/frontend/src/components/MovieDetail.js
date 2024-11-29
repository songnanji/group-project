import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
                if (!response.ok) {
                    throw new Error('영화 상세 정보를 불러오는데 실패했습니다');
                }
                const data = await response.json();
                setMovie(data.data.movie);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>에러: {error}</div>;
    if (!movie) return <div>영화를 찾을 수 없습니다.</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{movie.title_long}</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <img 
                    src={movie.large_cover_image}
                    alt={movie.title}
                    style={{ maxWidth: '300px', height: 'auto' }}
                />
                <div>
                    <p>개봉년도: {movie.year}</p>
                    <p>장르: {movie.genres?.join(', ')}</p>
                    <p>평점: {movie.rating}</p>
                    <p>상영시간: {movie.runtime}분</p>
                    <h3>줄거리:</h3>
                    <p style={{ 
                        lineHeight: '1.6', 
                        maxWidth: '800px',
                        whiteSpace: 'pre-wrap' 
                    }}>
                        {movie.description_intro}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;