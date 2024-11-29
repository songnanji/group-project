import React, { useState, useEffect } from 'react';
import Button from './ui/Button';

function Comments({ postId, user }) {
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    // 로컬 스토리지에서 댓글 불러오기
    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem('comments'));
        if (storedComments) {
            setComments(storedComments);
        }
    }, []);

    // 댓글이 변경될 때 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now(),
            content: newComment,
            author: user.email,
            timestamp: new Date().toISOString()
        };

        setComments(prev => ({
            ...prev,
            [postId]: [...(prev[postId] || []), comment]
        }));
        setNewComment('');
    };

    const handleEditComment = (commentId, newContent) => {
        setComments(prev => ({
            ...prev,
            [postId]: prev[postId].map(comment => 
                comment.id === commentId 
                    ? { ...comment, content: newContent }
                    : comment
            )
        }));
        setEditingCommentId(null);
        setEditedComment('');
    };

    const handleDeleteComment = (commentId) => {
        setComments(prev => ({
            ...prev,
            [postId]: prev[postId].filter(comment => comment.id !== commentId)
        }));
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <h3>댓글</h3>
            
            {user && (
                <div style={{ marginBottom: '20px' }}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 작성하세요"
                        rows="2"
                        style={{ 
                            width: '100%', 
                            padding: '10px',
                            marginBottom: '10px' 
                        }}
                    />
                    <Button 
                        onClick={handleAddComment}
                        style={{ padding: '5px 10px' }}
                    >
                        댓글 작성
                    </Button>
                </div>
            )}

            <div>
                {(comments[postId] || []).map(comment => (
                    <div 
                        key={comment.id} 
                        style={{ 
                            borderBottom: '1px solid #eee',
                            padding: '10px 0'
                        }}
                    >
                        {editingCommentId === comment.id ? (
                            <div>
                                <textarea
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    rows="2"
                                    style={{ 
                                        width: '100%', 
                                        padding: '10px',
                                        marginBottom: '10px' 
                                    }}
                                />
                                <Button 
                                    onClick={() => handleEditComment(comment.id, editedComment)}
                                    style={{ marginRight: '10px', padding: '5px 10px' }}
                                >
                                    수정 완료
                                </Button>
                                <Button 
                                    onClick={() => {
                                        setEditingCommentId(null);
                                        setEditedComment('');
                                    }}
                                    style={{ padding: '5px 10px' }}
                                >
                                    취소
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <p style={{ margin: '5px 0' }}>{comment.content}</p>
                                <p style={{ 
                                    fontSize: '0.8em', 
                                    color: '#666',
                                    margin: '5px 0' 
                                }}>
                                    작성자: {comment.author} | {new Date(comment.timestamp).toLocaleString()}
                                </p>
                                {user && user.email === comment.author && (
                                    <div>
                                        <Button 
                                            onClick={() => {
                                                setEditingCommentId(comment.id);
                                                setEditedComment(comment.content);
                                            }}
                                            style={{ marginRight: '5px', padding: '3px 8px' }}
                                        >
                                            수정
                                        </Button>
                                        <Button 
                                            onClick={() => handleDeleteComment(comment.id)}
                                            style={{ padding: '3px 8px' }}
                                        >
                                            삭제
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comments;