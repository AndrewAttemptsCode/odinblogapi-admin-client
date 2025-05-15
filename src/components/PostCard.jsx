import { User } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ $status }) => 
  $status === 'Published' ? 'green' : 'red'};
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
    font-size: 1.5rem;
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

const ErrorText = styled.p`
  color: red;
`

const PostCard = ({ post }) => {
  const [publishStatus, setPublishStatus] = useState(post.published ? 'Published' : 'Unpublished');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePublish = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          return window.location.href = `${import.meta.env.VITE_PUBLIC_URL}/login`;
        }
        return setError('Could not update status');
      }
      
      const data = await response.json();

      setPublishStatus(data.post.published ? 'Published' : 'Unpublished');
    } catch (error) {
      console.error('publishing error:', error);
      setError('Could not update status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <strong>{post.title}</strong>
      <Info>
        <User size={20} color="#3B82F6" />
        {post.author.username}
      </Info>
      <Info>
        <Button
          onClick={handlePublish}
          disabled={loading}
          $status={publishStatus}
        >
          {loading ? 'Processing...' : publishStatus}
        </Button>
        {error && <ErrorText>{error}</ErrorText>}
      </Info>
      <hr />
    </Card>
  );
}

export default PostCard;