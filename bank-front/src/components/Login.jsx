import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard.jsx';
import Header from '../components/Header.jsx';
import styles from './login.module.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [userRole, setUserRole] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/v1/login', { username, password });
      const accessToken = response.data.accessToken;

      // Store the token in localStorage
      localStorage.setItem('accessToken', accessToken);

      // Fetch user role
      const roleResponse = await axios.get('http://127.0.0.1:3000/api/v1/user-role', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const userRole = roleResponse.data.role;
      setUserRole(userRole); // Set user role in state

      // Redirect to dashboard page with user role
      // window.location.href = `/dashboard?role=${userRole}`; 
    } catch (error) {
      setMessage('Invalid Username or Password');
      console.error('Login error:', error);
    }
  };

  // Render Dashboard if userRole is not null
  if (userRole) {
    return <Dashboard userRole={userRole} />;
  }

  return (
    <div className={styles['login-container']}>
      <Header />
      <div className={styles['login-form']}>
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
        {message && <p className={styles['error-message']}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
