import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); 
  const [message, setMessage] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      
      if ((role === 'clerk' || role === 'admin') && !accessToken) {
        setMessage('You must be logged in as an admin to register clerks or admins.');
        return;
      }

      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

      const response = await axios.post(
        'http://localhost:3000/api/v1/register',
        { username, password, role },
        { headers }
      );

      console.log('User registered successfully:', response.data.message);
      setMessage('User registered successfully');
      setUsername('');
      setPassword('');
      setRole('customer'); // Reset role to 'customer'
    } catch (error) {
      setMessage('Failed to register user. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Register A New User</h3>

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
            <option value="customer">Customer</option>
            <option value="clerk">Clerk</option>
            <option value="admin">Admin</option>
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
