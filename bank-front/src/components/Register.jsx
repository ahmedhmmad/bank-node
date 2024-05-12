import React, { useState} from 'react';
import axios from 'axios';
import styles from './register.module.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!accessToken) {
        setMessage('Access token not found. Please log in.');
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/register',
        { username, password, role },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      console.log('User registered successfully:', response.data.message);
      setMessage('User registered successfully');
      setUsername('');
      setPassword('');
      setRole('');
    } catch (error) {
      setMessage('Failed to register user. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register New User</h2>
     
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="clerk">Clerk</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}

    </div>
  );
};

export default Register;
