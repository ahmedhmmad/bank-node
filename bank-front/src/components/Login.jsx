import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard.jsx';
import Header from '../components/Header.jsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const[userId,setUserId] =useState(null);
  

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
      
      setUserRole(roleResponse.data.role); // Set user role in state
      setUserId(roleResponse.data.userId); // Set user ID in state
      

    } catch (error) {
      setMessage('Invalid Username or Password');
      console.error('Login error:', error);
    }
  };

  // Render Dashboard if userRole is not null
  if (userRole) {
    return <Dashboard userRole={userRole} userId={userId} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
