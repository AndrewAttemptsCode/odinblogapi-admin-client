import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/comments', {
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
    return <p>Loading...</p>;
  }

  if (error) {
    throw error;
  }

  return (
    <div>
    {comments.map(comment => (
      <CommentCard key={comment.id} comment={comment} updateComments={fetchComments} />
    ))}
    </div>
  );
};

export default CommentList;
