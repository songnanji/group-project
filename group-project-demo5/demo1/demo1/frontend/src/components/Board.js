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

    // DB(API)로부터 게시글 불러오기
    useEffect(() => {
        fetch('/api/board')
            .then(response => {
                if (!response.ok) {
                    throw new Error('데이터를 가져오는 데 실패했습니다.');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('게시글 데이터를 가져오는 중 오류가 발생했습니다.');
            });
    }, []);

    const handleWrite = () => {
        if (newPostTitle.trim() === '' || newPostContent.trim() === '') return;
        //const post의 author이 매우 중요!!
        const post = {
            id: Date.now(),
            title: newPostTitle,
            content: newPostContent,
            author: user,
        };
        // API로 데이터 전송
        fetch('/api/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('글쓰기 실패');
                }
                return response.json();
            })
            .then(data => {
                // 서버 응답 데이터를 사용해 게시글 상태 업데이트
                setPosts([data, ...posts]);
                setNewPostTitle('');
                setNewPostContent('');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('게시글 작성 중 오류가 발생했습니다.');
            });

    };

    const handleDelete = (id) => {
        fetch(`/api/board/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('게시글 삭제 실패');
                }
                return response.text();
            })
            .then(() => {
                // 삭제 성공 시, 로컬 상태에서 게시글 제거
                const updatedPosts = posts.filter(post => post.id !== id);
                setPosts(updatedPosts);
                alert('게시글이 삭제되었습니다.');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('게시글 삭제 중 오류가 발생했습니다.');
            });
    };

    const handleEdit = (post) => {
        setEditingPostId(post.id);
        setEditedTitle(post.title);
        setEditedContent(post.content);
    };

    const handleUpdate = (id) => {
        if (!editingPostId || editedTitle.trim() === '' || editedContent.trim() === '') {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        // 수정된 데이터를 서버에 보냄
        const updatedPost = {
            title: editedTitle,
            content: editedContent,
        };

        fetch(`/api/board/${editingPostId}`, {
            method: 'PUT', // 데이터 수정 요청
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('게시글 수정 실패');
                }
                return response.json();
            })
            .then(data => {
                // 로컬 상태 업데이트
                const updatedPosts = posts.map(post =>
                    post.id === editingPostId
                        ? { ...post, title: data.title, content: data.content }
                        : post
                );
                setPosts(updatedPosts);

                // 상태 초기화
                setEditingPostId(null);
                setEditedTitle('');
                setEditedContent('');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('게시글 수정 중 오류가 발생했습니다.');
            });
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
                    {user && selectedPost && user.trim().toLowerCase() === selectedPost.author?.trim().toLowerCase() && (
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
