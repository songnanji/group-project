import React, { useState } from 'react';

function ProfileEdit({ user, onUpdateUser }) {
    const [nickname, setNickname] = useState(user?.nickname || user?.email || '');
    const [profileImage, setProfileImage] = useState(user?.profileImage || null);

    const handleSaveChanges = () => {
        const updatedUser = { ...user, nickname, profileImage };
        onUpdateUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        alert('프로필이 저장되었습니다.');
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{
            width: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        }}>
            <h2 style={{ textAlign: 'center' }}>프로필 수정</h2>
            <form>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <label htmlFor="profileImage" style={{ display: 'block', marginBottom: '10px' }}>
                        <img
                            src={profileImage || 'https://via.placeholder.com/100'}
                            alt="Profile"
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid #ddd',
                            }}
                        />
                    </label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        style={{ display: 'none' }}
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('profileImage').click()}
                        style={{
                            display: 'block',
                            margin: '10px auto',
                            padding: '5px 10px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        프로필 사진 변경
                    </button>
                </div>
                <div style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <label style={{
                        marginRight: '10px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                    }}>닉네임:</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        style={{
                            flex: '1',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSaveChanges}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    저장
                </button>
            </form>
        </div>
    );
}

export default ProfileEdit;
