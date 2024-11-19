import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../store/userSlice';

function Register({ setCurrentPage }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    fullName: '',
    gender: '',
    hobby: ''
  });

  const dispatch = useDispatch();
  const error = useSelector(state => state.users.error);
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    console.log('Current users:', users);
  }, [users]);
  useEffect(() => {
    if (error === 'Username already exists!') {
      alert('User already registered!');
      setCurrentPage('login');
    }
  }, [error, setCurrentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
    if (!error) {
      setCurrentPage('login');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
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
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#333',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: 'white',
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
      transition: 'background-color 0.2s',
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
          <div style={styles.subtitle}>Create your account</div>
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
              required
              minLength={3}
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
              required
              minLength={6}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <input
              type="text"
              name="hobby"
              placeholder="Hobby"
              value={form.hobby}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button 
            type="submit" 
            style={{
              ...styles.button,
              ':hover': {
                backgroundColor: '#ff5722'
              }
            }}
          >
            Sign Up
          </button>
        </form>

        <div style={styles.linkText}>
          Already have an account?{' '}
          <span 
            style={styles.link} 
            onClick={() => setCurrentPage('login')}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;