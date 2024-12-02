import React, { useState, useEffect } from 'react';
import Button from './ui/Button';

function Comments({ postId, user }) { // 부모 컴포넌트로부터 postId를 받아옴
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    // 댓글 데이터를 DB에서 불러오는 함수
    useEffect(() => {
        if (!postId) {
            console.error('postId가 유효하지 않습니다.');
            return;
        }

        fetch(`/api/comments/${postId}`) // DB와 일치하는 postId 사용
            .then(response => {
                if (!response.ok) {
                    throw new Error('댓글 데이터를 가져오는 데 실패했습니다.');
                }
                return response.json();
            })
            .then(data => setComments(data))
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [postId]); // postId 변경 시 댓글 재요청

    const handleAddComment = () => {
        if (!newComment.trim() || !postId) {
            console.error('postId가 유효하지 않습니다.');
            return;
        }

        const comment = {
            content: newComment,
            post_id: postId, // 서버와 DB의 컬럼 이름과 일치
        };

        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('댓글 작성에 실패했습니다.');
                }
                return response.json();
            })
            .then(data => {
                setComments(prev => [...prev, data]);
                setNewComment('');
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    };

    const handleEditComment = (commentId, newContent) => {
        if (!newContent.trim()) {
            console.error("수정할 내용이 비어 있습니다.");
            return;
        }

        const updatedComment = {
            id: commentId,
            content: newContent,
        };

        fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedComment),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("댓글 수정에 실패했습니다.");
                }
                return response.json();
            })
            .then((updatedData) => {
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === updatedData.id ? updatedData : comment
                    )
                );
                setEditingCommentId(null);
                setEditedComment("");
            })
            .catch((error) => {
                console.error("Error editing comment:", error);
            });
    };

    const handleDeleteComment = (commentId) => {
        fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('댓글 삭제에 실패했습니다.');
                }
                setComments(prev => prev.filter(comment => comment.id !== commentId));
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });
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
                            marginBottom: '10px',
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
                {comments.map(comment => (
                    <div
                        key={comment.id}
                        style={{
                            borderBottom: '1px solid #eee',
                            padding: '10px 0',
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
                                        marginBottom: '10px',
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
                                <p
                                    style={{
                                        fontSize: '0.8em',
                                        color: '#666',
                                        margin: '5px 0',
                                    }}
                                >

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
