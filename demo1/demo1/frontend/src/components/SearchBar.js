// src/components/SearchBar.js
import React from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';

function SearchBar({ searchTerm, setSearchTerm, sortOption, setSortOption }) {
    const sortOptions = [
        { label: '장르 선택 ▼', value: '' },
        { label: 'SF', value: 'sf' },
        { label: '액션', value: 'action' },
        { label: '판타지', value: 'fantasy' },
        { label: '드라마', value: 'drama'},
        { label: '로맨스', value: 'romance'},
        { label: '공포', value: 'horror'},
        { label: '범죄', value: 'crime'},
        { label: '코미디', value: 'comedy'},
        { label: '애니메이션', value: 'animation'}
    ];

    return (
        <Card style={{ marginBottom: '20px', padding: '15px' }}>
            <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="영화 제목을 검색하세요"
                style={{ marginBottom: '10px' }}
            />
            <Select
                options={sortOptions}
                onChange={(e) => setSortOption(e.target.value)}
                defaultValue=""
                style={{ marginBottom: '10px' }}
            />
        </Card>
    );
}

export default SearchBar;