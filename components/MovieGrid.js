import React, { useState } from 'react';

function MovieGrid() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const movies = [
        { title: '존윅4', image: '/images/john-wick.jpg' },
        { title: '포드 vs 페라리', image: '/images/ford-ferrari.jpg' },
        { title: '탑건', image: '/images/top-gun.jpg' },
        { title: '오펜하이머', image: '/images/oppenheimer.jpg' }
    ];

    return (
        <div>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="검색"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={styles.searchInput}
                />
                <select style={styles.sortSelect}>
                    <option>정렬 선택 ▼</option>
                </select>
            </div>

            <div style={styles.movieGrid}>
                {movies.map((movie, index) => (
                    <div key={index} style={styles.movieCard}>
                        <img src={movie.image} alt={movie.title} style={styles.movieImage} />
                    </div>
                ))}
            </div>

            <img src="/images/shuffle-icon.png" alt="shuffle" style={styles.shuffleIcon} />
        </div>
    );
}

const styles = {
    searchContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px',
        gap: '20px'
    },
    searchInput: {
        flexGrow: 1,
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px'
    },
    sortSelect: {
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px'
    },
    movieGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '30px'
    },
    movieCard: {
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease'
    },
    movieImage: {
        width: '100%',
        display: 'block'
    },
    shuffleIcon: {
        width: '40px',
        height: '40px',
        margin: '20px auto'
    }
};

export default MovieGrid;
