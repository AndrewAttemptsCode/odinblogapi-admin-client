import { User } from "lucide-react";
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

const Card = styled.article`
  color: #111827;

  & strong {
    font-size: 1.3rem;
  }

  & a {
    color: #6B7280;
  }

  & hr {
    margin: 0.5rem 0;
  }

  @media (max-width: 450px) {
    & strong {
      font-size: 1rem;
    }
  }
`

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`

const CommentText = styled.p`
  white-space: pre-wrap;
`

const ErrorText = styled.p`
  color: red;
`

const CommentCard = ({ comment, updateComments }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async() => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/comments/${comment.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          return window.location.href = `${import.meta.env.VITE_PUBLIC_URL}/login`;
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
    <Card>
      <Info>
        <User size={20} color="#3B82F6" />
        <strong>{comment.author.username}</strong>
      </Info>
      <CommentText>{comment.text}</CommentText>
      <Info>
        <Button 
          disabled={loading}
          onClick={handleDelete}
        >
          {loading ? 'Processing...' : 'Delete'}
        </Button>
        {error && <ErrorText>{error}</ErrorText>}
      </Info>
      <hr />
    </Card>
  );
};

export default CommentCard;