import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function MovieDetail() {
    const location = useLocation();
    const navigate=useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(location.state?.movie);
    const [loading, setLoading] = useState(!location.state?.movie);
    const [error, setError] = useState(null);

    // 좋아요 및 공유 버튼 상태 관리
    const [likes, setLikes] = useState(0);

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

    const handleReviewSubmit = async (e) => {
        e.preventDefault(); // 폼 기본 동작 방지
        if (!userReview.trim()) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        try {
            // 리뷰 저장 요청
            const response = await fetch('http://localhost:8080/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: Number(id), // 현재 영화의 ID
                    content: userReview, // 작성된 리뷰 내용
                }),
            });

            if (!response.ok) {
                throw new Error(`리뷰 저장에 실패했습니다. 상태 코드: ${response.status}`);
            }

            // 성공 후 리뷰 초기화
            setUserReview('');

            // 최신 리뷰 목록 불러오기
            fetchReviews();
        } catch (error) {
            console.error('리뷰 저장 중 오류 발생:', error.message);
            alert('리뷰 저장에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/reviews/movie/${id}`);
            if (!response.ok) {
                throw new Error('리뷰를 불러오는 데 실패했습니다.');
            }
            const data = await response.json();

            // 서버에서 받은 리뷰를 화면에 반영
            setUserReviews(data.map((review) => review.content));
        } catch (error) {
            console.error('리뷰 불러오기 중 오류 발생:', error.message);
            alert('리뷰를 불러오지 못했습니다. 나중에 다시 시도해주세요.');
        }
    };

    const handleLikeClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/likes/${id}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('좋아요 요청에 실패했습니다.');
            }

            // 최신 좋아요 수 가져오기
            fetchLikes();
        } catch (error) {
            console.error('Error:', error.message);
            alert('좋아요 요청 중 문제가 발생했습니다.');
        }
    };

    const fetchLikes = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/likes/${id}`);
            if (!response.ok) {
                throw new Error('좋아요 수를 불러오는데 실패했습니다.');
            }
            const likes = await response.json();
            setLikes(likes);
        } catch (error) {
            console.error('Error fetching likes:', error.message);
            alert('좋아요 수를 불러오는 중 문제가 발생했습니다.');
        }
    };

    const handleShareClick = () => {
        // 공유 링크 생성
        const shareLink = window.location.href;
        navigator.clipboard.writeText(shareLink).then(() => {
            alert('링크가 복사되었습니다!');
        });
    };

// 컴포넌트가 렌더링될 때 좋아요 수, 리뷰 불러오기
    useEffect(() => {
        fetchLikes();
        fetchReviews();
    }, [id]);

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
                <p>장르: {Array.isArray(movie.genres) &&  movie.genres.length>0 ? movie.genres.join(",") :typeof movie.genres === "string" && movie.genres ? movie.genres:'장르 정보 없음'}</p>
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

            {/* 좋아요 및 공유 버튼 */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '10px' }}>
                <button onClick={handleLikeClick} style={{ padding: '10px 20px' }}>
                    좋아요 ❤️ ({likes})
                </button>
                <button onClick={handleShareClick} style={{ padding: '10px 20px' }}>
                    공유하기 🔗
                </button>
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
