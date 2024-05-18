import React, { useState } from 'react';
import axios from 'axios';

export default function Deposit({ userRole,userId }) {
  //const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('accessToken');

  const handleDeposit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/deposit', { amount }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error depositing money');
      console.error('Deposit error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h3 className="text-2xl font-bold mb-4">User ID</h3>
      <input 
        type="text" 
        value={userId} 
        disabled  
        className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100"/>
      <label htmlFor="amount" className="block text-lg font-medium mb-2">Amount</label>
      <input 
        type="number" 
        id="amount" 
        name="amount" 
        required 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
      />
      <button 
        onClick={handleDeposit} 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Deposit
      </button>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
