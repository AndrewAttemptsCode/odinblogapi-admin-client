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

  const handlePublish = async () => {
    const token = sessionStorage.getItem('token');

    setLoading(true);

    const response = await fetch(`http://localhost:8080/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setPublishStatus(data.post.published ? 'Published' : 'Unpublished');
    console.log('Publish updated', data);

    // TODO capture and process all the errors

    setLoading(false);
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
    </article>
  );
}

export default PostCard;