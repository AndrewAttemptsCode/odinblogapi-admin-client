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

const PostCard = ({ post }) => {
  const [publishStatus, setPublishStatus] = useState(post.published ? 'Published' : 'Unpublished');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePublish = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      
      const response = await fetch(`http://localhost:8080/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          return window.location.href = 'http://localhost:5173/login';
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
    <article>
      <p><strong>{post.title}</strong></p>
      <p>{post.author.username}</p>
      <Button
        onClick={handlePublish}
        disabled={loading}
        $status={publishStatus}
      >
        {loading ? 'Processing...' : publishStatus}
      </Button>
      {error && <p>{error}</p>}
    </article>
  );
}

export default PostCard;