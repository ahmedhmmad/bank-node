import React, { useState } from 'react';
import axios from 'axios';
import './login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/login', { username, password });
      const accessToken = response.data.accessToken;

      // Store the token in localStorage
      localStorage.setItem('accessToken', accessToken);

      // Handle successful login
      console.log('Login successful!');
      setMessage(`Logged Successfully and your Token is Stored`);
    } catch (error) {
      setMessage('Invalid Username or Password');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default Login;
