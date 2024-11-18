import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/userSlice';

function Login({ setCurrentPage }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
    if (!error) {
      setCurrentPage('dashboard');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dae0e6',
      padding: '20px',
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '32px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    logo: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#ff4500',
      marginBottom: '8px',
    },
    subtitle: {
      color: '#666',
      fontSize: '14px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    error: {
      color: '#ff0000',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ff4500',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    linkText: {
      textAlign: 'center',
      marginTop: '24px',
      fontSize: '14px',
      color: '#666',
    },
    link: {
      color: '#ff4500',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <div style={styles.logo}>reddit</div>
          <div style={styles.subtitle}>Login to continue</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>

        <div style={styles.linkText}>
          New to Reddit?{' '}
          <span style={styles.link} onClick={() => setCurrentPage('register')}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;