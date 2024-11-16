// src/components/Signup.js
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
        name: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 로컬 스토리지에서 기존 사용자 정보 가져오기
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // 이미 가입된 이메일인지 확인
        const userExists = existingUsers.find(user => user.email === formData.email);
        if (userExists) {
            alert('이미 가입된 이메일입니다.');
            return;
        }

        // 새로운 사용자 추가
        const newUser = {
            email: formData.email,
            password: formData.password,
            name: formData.name
        };
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        alert('회원가입이 완료되었습니다.');
        navigate('/');
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
                    name="name"
                    type="text"
                    value={formData.name}
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