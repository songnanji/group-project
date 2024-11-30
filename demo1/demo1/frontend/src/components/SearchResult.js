// src/components/SearchResult.js
import React from "react";
import { useLocation } from "react-router-dom";

function SearchResult() {
    const location = useLocation();
    const movies = location.state?.movies || []; // 서버에서 받은 검색 결과

    if (movies.length === 0) {
        return <h2>검색 결과 없음</h2>; // 검색 결과가 없을 때
    }

    return (
        <div>
            <h1>검색 결과</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {movies.map((movie, index) => (
                    <div key={index} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
                        <img
                            src={movie.largeCoverImage}
                            alt={movie.title}
                            style={{ width: "100%", height: "auto", borderRadius: "4px" }}
                        />
                        <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{movie.title}</h3>
                        <p><strong>Year:</strong> {movie.year}</p>
                        <p><strong>Rating:</strong> {movie.rating}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} mins</p>
                        <p><strong>Genres:</strong> {movie.genres}</p>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p style={{ fontSize: "14px", color: "#555" }}>{movie.descriptionIntro}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResult;
