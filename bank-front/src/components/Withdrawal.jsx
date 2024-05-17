import React, { useState } from 'react';
import axios from 'axios';


export default function Withdrawal() {
    const [customerId, setCustomerId] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('accessToken');
    

    const handleWithdrawal = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/withdrawal', { amount },{
                headers:{Authorization:`Bearer ${token}`}
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error Withdrawaling money');
            console.error('Withdrawal error:', error);
        }
    };

    return (
        <>
            <h3>User ID</h3>
            <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" required value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handleWithdrawal}>Withdrawal</button>
            {message && <p>{message}</p>}
        </>
    );
}
