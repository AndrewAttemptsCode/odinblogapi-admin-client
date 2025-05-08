import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: red;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  border: none;
  padding: 4px 8px;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;

const CommentCard = ({ comment, updateComments }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async() => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/comments/${comment.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          return window.location.href = 'http://localhost:5173/login';
        }
        return setError('Could not remove comment.');
      }

      updateComments();

    } catch (error) {
      console.error('Remove comment error:', error);
      setError('Could not remove comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article>
      <p><strong>{comment.author.username}</strong></p>
      <p>{comment.text}</p>
      <Button 
        disabled={loading}
        onClick={handleDelete}
      >
        {loading ? 'Processing...' : 'Delete'}
      </Button>
      {error && <p>{error}</p>}
    </article>
  );
};

export default CommentCard;