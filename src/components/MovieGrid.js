// src/components/MovieGrid.js
import React from 'react';
import Card from './ui/Card';

const movies = [
    { id: 1, title: '기생충', popularity: 95, releaseDate: '2019-05-30', rating: 8.6 },
    { id: 2, title: '어벤져스', popularity: 90, releaseDate: '2012-05-04', rating: 8.0 },
    { id: 3, title: '토르', popularity: 80, releaseDate: '2011-05-06', rating: 7.0 },
    { id: 4, title: '인셉션', popularity: 85, releaseDate: '2010-07-16', rating: 8.8 },
    { id: 5, title: '인터스텔라', popularity: 88, releaseDate: '2014-11-07', rating: 8.6 }
    // ... 추가적인 영화 데이터
];

function MovieGrid({ searchTerm, sortOption, user }) {
    // 검색 필터링
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 정렬
    const sortedMovies = [...filteredMovies];
    switch (sortOption) {
        case 'popular':
            sortedMovies.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'latest':
            sortedMovies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            break;
        case 'rating':
            sortedMovies.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {sortedMovies.length > 0 ? (
                sortedMovies.map(movie => (
                    <Card key={movie.id} style={{ width: '200px', padding: '10px' }}>
                        <h3>{movie.title}</h3>
                        <p>인기: {movie.popularity}</p>
                        <p>개봉일: {movie.releaseDate}</p>
                        <p>평점: {movie.rating}</p>
                    </Card>
                ))
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
}

export default MovieGrid;