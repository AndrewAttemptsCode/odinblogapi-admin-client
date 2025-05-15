import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const Container = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  max-width: 75ch;
  width: 100%;
`

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = new Error('Failed to fetch comments from the server.');
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
      }

      const data = await response.json();

      setComments(data);

    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setError({
          status: 503,
          statusText: 'Service Unavailable.',
          message: 'Could not connect to the server, please try again later.',
        })
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  } 

  useEffect(() => { 
    fetchComments();
  }, []);

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    throw error;
  }

  return (
    <Container>
    {comments.map(comment => (
      <CommentCard key={comment.id} comment={comment} updateComments={fetchComments} />
    ))}
    </Container>
  );
};

export default CommentList;
