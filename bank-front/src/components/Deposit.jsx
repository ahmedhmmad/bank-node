import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Deposit({ userId }) {
    const [amount, setAmount] = useState();
    const [message, setMessage] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0);
    const token = localStorage.getItem('accessToken');

    const fetchCurrentBalance = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/balance', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCurrentBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching current balance:', error);
            setMessage('Error fetching current balance');
        }
    };

    const handleDeposit = async () => {
        
        try {
            const response = await axios.post('http://localhost:3000/api/v1/deposit', { amount }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setMessage(response.data.message);
            await fetchCurrentBalance();
           
        } catch (error) {
            setMessage(`Error depositing money ${amount}`);
            console.error('Deposit error:', error);
        }
    };

    useEffect(() => {
        fetchCurrentBalance();
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-bold mb-4">User ID</h3>
            <input 
                type="text" 
                value={userId} 
                disabled  
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100"
            />
            {currentBalance !== null && (
                <p className="mb-4">Current Balance: ${currentBalance.toFixed(2)}</p>
            )}
            <label htmlFor="amount" className="block text-lg font-medium mb-2">Amount</label>
            <input 
                type="number" 
                id="amount" 
                name="amount" 
                required 
                value={amount} 
                onChange={(e) => setAmount(parseFloat(e.target.value))}
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

