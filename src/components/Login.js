// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로컬 스토리지에서 사용자 정보 가져오기
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const user = existingUsers.find(
            user => user.email === email && user.password === password
        );

        if (user) {
            onLogin({ email: user.email, name: user.name });
            navigate('/');
        } else {
            alert('이메일 또는 비밀번호가 틀렸습니다.');
        }
    };

    return (
        <Card style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    style={{ marginBottom: '10px' }}
                    required
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    style={{ marginBottom: '20px' }}
                    required
                />
                <Button type="submit">로그인</Button>
            </form>
        </Card>
    );
}

export default Login;