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


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };

    //내가 추가한 코드
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 클라이언트 측 유효성 검사
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email,password}), //원래 매개변수 formData였음
            });

            if (response.ok) {
                const data = await response.json();
                alert('로그인 성공');
                onLogin(data); // 상위 컴포넌트로 로그인 상태 전달
                navigate('/'); // 기본 페이지로 리다이렉트하기 위해 추가함

            } else {
                const errorData = await response.json();
                alert(errorData.error || '로그인 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다:', error);
            alert('서버에 연결할 수 없습니다.');
        }
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // 로컬 스토리지에서 사용자 정보 가져오기
    //     const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    //
    //     const user = existingUsers.find(
    //         user => user.email === email && user.password === password
    //     );
    //
    //     if (user) {
    //         onLogin({ email: user.email, name: user.name });
    //         navigate('/');
    //     } else {
    //         alert('이메일 또는 비밀번호가 틀렸습니다.');
    //     }
    // };

        return (
        <Card style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    id="email" //추가함 스타일 속성 때문에
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    style={{ marginBottom: '10px' }}
                    required
                />
                <Input
                    type="password"
                    id="password" //추가함 스타일 속성 때문에
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