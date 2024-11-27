// src/components/SearchBar.js
import React from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from "./Button";

function SearchBar({ searchTerm, setSearchTerm, sortOption, setSortOption, onSearch , onGenreSearch}) {
    const sortOptions = [
        { label: '장르 선택 ▼', value: '' },
        { label: 'SF', value: 'Sci-Fi' },
        { label: '액션', value: 'Action' },
        { label: '판타지', value: 'fantasy' },
        { label: '드라마', value: 'Drama'},
        { label: '로맨스', value: 'Romance'},
        { label: '공포', value: 'Horror'},
        { label: '범죄', value: 'Crime'},
        { label: '스릴러',value: 'Thriller'},
        {label: '다큐멘터리',value: 'Documentary'},
        { label: '코미디', value: 'Comedy'},
        { label: '애니메이션', value: 'Animation'}
    ];

    // const handleClick = () => {
    //     onSearch(searchTerm.trim()); // 부모 컴포넌트의 onSearch 함수 호출
    // };
    const handleClick = () => {
        if (sortOption) {
            // 선택된 장르가 있을 경우 onGenreSearch 호출
            onGenreSearch(sortOption);
        } else if(searchTerm){
            // 검색어가 있을 경우 onSearch 호출
            onSearch(searchTerm);
        }
    };

    const handleGenreChange = (e) => {
        setSortOption(e.target.value);
    };

    //

    return (
        <Card style={{ marginBottom: '20px', padding: '15px' }}>
            <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="영화 제목을 검색하세요"
                style={{ marginBottom: '10px' }}
            />
            <Button onClick={handleClick} style={{ flexShrink: 0 }}>
            검색
            </Button>
            <Select
                options={sortOptions}
                //onChange={(e) => setSortOption(e.target.value)}
                onChange={handleGenreChange}
                defaultValue=""
                style={{ marginBottom: '10px' }}
            />
        </Card>
    );
}

export default SearchBar;