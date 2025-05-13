import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 65ch;
  color: #111827;

  & textarea {
    width: 100%;
    max-width: 65ch;
    min-height: 20ch;
    resize: vertical;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  & input {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  & button {
    border: none;
    border-radius: 5px;
    padding: 8px;
    background-color: #3B82F6;
    color: #F9FAFB;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`
const ErrorText = styled.p`
  color: red;
`

export const PostCreate = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token');
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          return setErrors(data.errors); 
        }
       }

      console.log(data.message);
      navigate('/posts');

    } catch (error) {
      console.error('submit post error:', error);
      setErrors([{ path: 'form', msg: 'Internal Server Error' }]);
    } finally {
      setLoading(false);
    }

  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="title"><strong>Title:</strong></label>
      <input type="text" name="title" id="title" value={formData.title} onChange={handleOnChange} />
      <ErrorText>{errors?.find(error => error.path === 'title')?.msg}</ErrorText>
      <label htmlFor="text"><strong>Post Text:</strong></label>
      <textarea name="text" id="text" value={formData.text} onChange={handleOnChange}></textarea>
      <ErrorText>{errors?.find(error => error.path === 'text')?.msg}</ErrorText>
      <ErrorText>{errors?.find(error => error.path === 'form')?.msg}</ErrorText>
      <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Create Post'}</button>
    </Form>
  );
};

export default PostCreate;
