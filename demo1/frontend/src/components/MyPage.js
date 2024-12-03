import React, { useState } from 'react';
import Button from './ui/Button';
function MyPage({ user }) {
    const [username, setUsername] = useState(user || '');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = () => {
        if (!newPassword.trim() || !currentPassword.trim()) {
            setMessage('현재 비밀번호와 새 비밀번호를 입력해주세요.');
            return;
        }

        fetch('http://localhost:8080/api/change-password', {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                user: user,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('비밀번호 변경에 실패했습니다.');
                }
                return response.json();
            })
            .then(response => {
                setMessage( response.message ||'비밀번호가 성공적으로 변경되었습니다.');
                setCurrentPassword('');
                setNewPassword('');
            })
            .catch(error => {
                setMessage(error.message || '서버 오류가 발생했습니다.');
            });
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
            <h1>마이페이지</h1>
            <h2>비밀번호 변경</h2>
            <div>
                <input
                    type="password"
                    placeholder="현재 비밀번호"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <button onClick={handlePasswordChange}>변경</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default MyPage;