import React, { useState } from 'react';
import axios from 'axios';

export default function Transfer() {
  const [customerId,setCustomerId]= useState('');
  const [receiverId,setReceiverId]=useState('');
  const [amount,setAmount]=useState(0);
  const [message,setMessage]=useState('')
  const token=localStorage.getItem('accessToken');

  const handleTranfser= async () => {
    try{
      const response = await axios.post('http://localhost:3000/api/v1/transfer', { receiverId,amount },{
                headers:{Authorization:`Bearer ${token}`}
            });
            setMessage(response.data.message);


    }catch(error)
    {
       setMessage('Error Transfering money');
       console.error('Transfer error:', error);
    }
  }

  
  return (
    <>
      {/* <h3>Transfer From</h3>
      <label htmlFor="transferFrom">User ID</label>
      <input type="text" id="transferFrom" name="transferFrom" /> */}
      <h3>Transfer To</h3>
      <label htmlFor="transferTo">User ID</label>
      <input type="text" id="transferTo" name="transferTo" value={receiverId} onChange={(e)=>setReceiverId(e.target.value)} />
      <label htmlFor="transferAmount">Amount</label>
      <input type="number" id="transferAmount" name="transferAmount" value={amount} onChange={(e)=>setAmount(e.target.value)} />
      <button onClick={handleTranfser}> Transfer </button>
      {message && <p>{message}</p>}
    </>
  );
}
