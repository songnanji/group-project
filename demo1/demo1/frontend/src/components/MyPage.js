import React, { useState } from 'react';
import Button from './ui/Button';
function MyPage({ user }) {
    const [username, setUsername] = useState(user?.name || '');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedUser = { ...user, name: username, password: password };
        
        try {
            // DB 업데이트를 위한 API 호출 
            const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser)
            });

            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }
            
            alert('사용자 정보가 성공적으로 업데이트되었습니다.');

            
        } catch (error) {
            console.error('업데이트 중 오류 발생:', error);
            alert('업데이트 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>마이페이지</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디 변경 : </label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={handleUsernameChange} 
                    />
                </div>
                <div>
                    <label>비밀번호 변경 : </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                    />
                </div>
                <Button type="submit">수정하기</Button>
            </form>
        </div>
    );
}

export default MyPage; 