import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import Button from './ui/Button';
function Board({ user }) {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);

    // 로컬 스토리지에서 게시글 불러오기
    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts'));
        if (storedPosts) {
            setPosts(storedPosts);
        }
    }, []);

    // 게시글이 변경될 때 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const handleWrite = () => {
        if (newPostTitle.trim() === '' || newPostContent.trim() === '') return;

        const post = {
            id: Date.now(),
            title: newPostTitle,
            content: newPostContent,
            author: user.email,
        };
        setPosts([post, ...posts]);
        setNewPostTitle('');
        setNewPostContent('');
    };

    const handleDelete = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
    };

    const handleEdit = (post) => {
        setEditingPostId(post.id);
        setEditedTitle(post.title);
        setEditedContent(post.content);
    };

    const handleUpdate = (id) => {
        if (editedTitle.trim() === '' || editedContent.trim() === '') return;

        const updatedPosts = posts.map(post => {
            if (post.id === id) {
                return { ...post, title: editedTitle, content: editedContent };
            }
            return post;
        });
        setPosts(updatedPosts);
        setEditingPostId(null);
        setEditedTitle('');
        setEditedContent('');
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditedTitle('');
        setEditedContent('');
    };

    const handleTitleClick = (post) => {
        setSelectedPost(post);
    };

    const handleBackToList = () => {
        setSelectedPost(null);
    };

    return (
        <div>
            <h1>게시판</h1>

            {selectedPost ? (
                <div style={{ padding: '20px' }}>
                    <h2>{selectedPost.title}</h2>
                    <p style={{ 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: '20px 0'
                    }}>{selectedPost.content}</p>
                    <p style={{ fontStyle: 'italic', color: '#555' }}>작성자: {selectedPost.author}</p>
                    {user && user.email === selectedPost.author && (
                        <div style={{ marginBottom: '10px' }}>
                            <Button onClick={() => handleEdit(selectedPost)} style={{ marginRight: '10px', padding: '5px 10px' }}>
                                수정
                            </Button>
                            <Button onClick={() => {
                                handleDelete(selectedPost.id);
                                setSelectedPost(null);
                            }} style={{ padding: '5px 10px' }}>
                                삭제
                            </Button>
                        </div>
                    )}
                    <Button onClick={handleBackToList} style={{ padding: '5px 10px' }}>
                        목록으로 돌아가기
                    </Button>

                    <Comments postId={selectedPost.id} user={user} />
                </div>
            ) : (
                <>
                    {user && (
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="text"
                                value={newPostTitle}
                                onChange={(e) => setNewPostTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                            />
                            <textarea
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder="내용을 작성하세요"
                                rows="4"
                                style={{ 
                                    width: '100%', 
                                    padding: '10px', 
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word'
                                }}
                            />
                            <Button onClick={handleWrite} style={{ marginTop: '10px', padding: '10px 20px' }}>
                                글쓰기
                            </Button>
                        </div>
                    )}

                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {posts.map(post => (
                            <li key={post.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                                {editingPostId === post.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                        />
                                        <textarea
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            rows="4"
                                            style={{ width: '100%', padding: '10px', whiteSpace: 'pre-wrap' }}
                                        />
                                        <Button onClick={() => handleUpdate(post.id)} style={{ marginRight: '10px', padding: '5px 10px' }}>
                                            업데이트
                                        </Button>
                                        <Button onClick={handleCancelEdit} style={{ padding: '5px 10px' }}>
                                            취소
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 
                                            onClick={() => handleTitleClick(post)} 
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {post.title}
                                        </h3>
                                        <p style={{ fontStyle: 'italic', color: '#555' }}>작성자: {post.author}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Board;
