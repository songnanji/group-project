import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function MovieDetail() {
    const location = useLocation();
    const navigate=useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(location.state?.movie);
    const [loading, setLoading] = useState(!location.state?.movie);
    const [error, setError] = useState(null);


    // 리뷰 관련 상태 관리
    const [userReview, setUserReview] = useState('');
    const [userReviews, setUserReviews] = useState([]);
    const [expertReviews, setExpertReviews] = useState([
        { id: 1, author: "Expert A", content: "A must-watch movie with outstanding performances." },
        { id: 2, author: "Expert B", content: "A decent movie with some flaws in the storyline." },
    ]);
    const [youtubeReviews, setYoutubeReviews] = useState([
        { id: 1, title: "Movie Review by YouTuber X", url: "https://youtu.be/example1" },
        { id: 2, title: "Top 5 Things About This Movie", url: "https://youtu.be/example2" },
    ]);

    useEffect(() => {
        // movie가 없을 때만 fetch
        if (!movie) {
            const fetchMovieDetail = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/movies/${id}`);
                    if (!response.ok) {
                        throw new Error('영화 상세 정보를 불러오는데 실패했습니다');
                    }
                    const data = await response.json();
                    setMovie(data);  
                    setLoading(false);
                } catch (error) {
                    console.error('Error:', error);
                    setError(error.message);
                    setLoading(false);
                }
            };

            fetchMovieDetail();
        }
    }, [id, movie]); 

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (userReview.trim()) {
            setUserReviews([...userReviews, userReview]);
            setUserReview('');
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>에러: {error}</div>;
    if (!movie) return <div>영화를 찾을 수 없습니다.</div>;

    return (
        <div style={{ padding: '20px' }}>
        <h1>{movie.title_long}</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
            <img
                src={movie.largeCoverImage}
                alt={movie.title}
                style={{ maxWidth: '300px', height: 'auto' }}
            />
            <div>
                <p>개봉년도: {movie.year}</p>
                <p>장르: {Array.isArray(movie.genres) ? movie.genres.join(', ') : '장르 정보 없음'}</p>
                <p>평점: {movie.rating}</p>
                <p>상영시간: {movie.runtime}분</p>
                <h3>줄거리:</h3>
                <p style={{
                    lineHeight: '1.6',
                    maxWidth: '800px',
                    whiteSpace: 'pre-wrap'
                }}>
                    {movie.descriptionIntro}
                </p>
            </div>
        </div>

    
            {/* 리뷰 섹션 */}
            <div style={{ marginTop: '40px' }}>
                <h2>사용자 리뷰</h2>
                <form onSubmit={handleReviewSubmit} style={{ marginBottom: '20px' }}>
                    <textarea
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                        placeholder="리뷰를 작성해주세요..."
                        rows="4"
                        style={{ width: '100%', padding: '10px' }}
                    />
                    <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>리뷰 작성</button>
                </form>
                <ul>
                    {userReviews.map((review, index) => (
                        <li key={index} style={{ marginBottom: '10px', lineHeight: '1.6' }}>
                            {review}
                        </li>
                    ))}
                </ul>

                <h2>전문가 리뷰</h2>
                <ul>
                    {expertReviews.map((review) => (
                        <li key={review.id}>
                            <strong>{review.author}:</strong> {review.content}
                        </li>
                    ))}
                </ul>

                <h2>유튜브 리뷰</h2>
                <ul>
                    {youtubeReviews.map((review) => (
                        <li key={review.id}>
                            <a href={review.url} target="_blank" rel="noopener noreferrer">
                                {review.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MovieDetail;
