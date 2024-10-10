import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and API call logic here
    console.log(formData);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f9'
    },
    form: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      textAlign: 'center',
      color: '#333'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '.5rem',
      fontSize: '14px',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '14px'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    link: {
      display: 'block',
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '14px',
      color: '#007bff',
      textDecoration: 'none'
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your username"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your email"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your password"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Address</label>
          <input
            type="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your address"
            required
          />
        </div>

        <button
          type="submit"
          style={{ ...styles.button, ...styles.buttonHover }}
        >
          Sign Up
        </button>

        <a href="/LogIn" style={styles.link}>Already have an account? Log in</a>
      </form>
    </div>
  );
};

export default SignUp;
