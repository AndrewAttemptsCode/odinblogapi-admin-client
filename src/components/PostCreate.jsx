import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TextArea = styled.textarea`
  width: 100%;
  max-width: 65ch;
  min-height: 20ch;
  resize: vertical;
  padding: 0.5rem;
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
      const response = await fetch('http://localhost:8080/posts', {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title" value={formData.title} onChange={handleOnChange} />
      {errors?.find(error => error.path === 'title')?.msg}
      <label htmlFor="text">Post Text:</label>
      <TextArea name="text" id="text" value={formData.text} onChange={handleOnChange}></TextArea>
      {errors?.find(error => error.path === 'text')?.msg}
      {errors?.find(error => error.path === 'form')?.msg}
      <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Create Post'}</button>
    </form>
  );
};

export default PostCreate;
