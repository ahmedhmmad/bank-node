import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Register A new User</h3>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Role:</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required 
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="clerk">Clerk</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Register;
