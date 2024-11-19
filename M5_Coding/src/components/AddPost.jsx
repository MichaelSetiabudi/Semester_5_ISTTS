import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../store/postSlice';

function AddPost({ setCurrentLoginPage }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link_url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    dispatch(addPost({
      title: formData.title,
      description: formData.description,
      link_url: formData.link_url,
      author: currentUser.username, 
    }));

    setFormData({
      title: '',
      description: '',
      link_url: ''
    });
    setCurrentLoginPage('dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      maxWidth: '40rem',
      margin: '1.25rem auto',
      padding: '0 1.25rem',
      width: '100%'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.25rem',
        border: '0.063rem solid #ccc',
        padding: '1rem'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '500',
          marginBottom: '1rem',
          color: '#1c1c1c'
        }}>
          Add Post
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Insert post title here"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.25rem',
                border: '0.063rem solid #ccc',
                fontSize: '0.875rem',
                backgroundColor: '#f6f7f8'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Insert post description here"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.25rem',
                border: '0.063rem solid #ccc',
                fontSize: '0.875rem',
                backgroundColor: '#f6f7f8',
                minHeight: '8rem',
                resize: 'vertical'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="url"
              name="link_url"
              value={formData.link_url}
              onChange={handleChange}
              placeholder="Add Picture (optional)"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.25rem',
                border: '0.063rem solid #ccc',
                fontSize: '0.875rem',
                backgroundColor: '#f6f7f8'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#0079d3',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '1.25rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              Post
            </button>
            <button
              type="button"
              onClick={() => setCurrentLoginPage('dashboard')}
              style={{
                backgroundColor: 'transparent',
                color: '#0079d3',
                border: '0.063rem solid #0079d3',
                padding: '0.5rem 1.5rem',
                borderRadius: '1.25rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;