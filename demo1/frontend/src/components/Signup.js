import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 클라이언트 측 유효성 검사
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
            alert('모든 필드를 채워주세요.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    username: formData.username,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('회원가입이 완료되었습니다.');
                navigate('/');
            } else {
                let errorMessage = '회원가입 중 오류가 발생했습니다.';
                if (response.headers.get('content-type')?.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } else {
                    console.error('서버 응답이 JSON이 아님');
                }
                alert(errorMessage);
            }
        } catch (error) {
            console.error('회원가입 중 오류가 발생했습니다:', error);
            alert('서버에 연결할 수 없습니다.');
        }
    };

    return (
        <Card style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                    style={{ marginBottom: '10px' }}
                    required
                />
                <Input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="이름"
                    style={{ marginBottom: '10px' }}
                    required
                />
                <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                    style={{ marginBottom: '10px' }}
                    required
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                    style={{ marginBottom: '20px' }}
                    required
                />
                <Button type="submit">회원가입</Button>
            </form>
        </Card>
    );
}

export default Signup;
