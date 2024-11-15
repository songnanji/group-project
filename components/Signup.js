import React, { useState } from 'react';

function Signup() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (id.length < 2 || id.length > 20) {
            setError("ID는 2~20글자로 입력해주세요.");
            return false;
        }
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("회원가입 성공!");
        }
    };

    return (
        <div style={styles.container}>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={styles.inputField}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.inputField}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호 재확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.inputField}
                    required
                />
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>완료</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center'
    },
    inputField: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#eee',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        marginBottom: '10px'
    }
};

export default Signup;
