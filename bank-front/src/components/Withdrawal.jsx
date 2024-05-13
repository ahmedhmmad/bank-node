import React, { useState } from 'react';

export default function Withdrawal() {
    
    const [userInput,setUserInput]=useState({initialValue:0});
    function handleChange(inputIdentifier,newValue)
    {
        setUserInput((prevUserInput)=>{
            return{
                ...prevUserInput,[inputIdentifier]:newValue
            }
        }
        );
    }
  return (
    <>
      <h3>User ID</h3>
      <label htmlFor="amount">Amount</label>
      <input type="number" id="amount" name="amount" required value={userInput.initialValue} onChange={(event)=>handleChange('intialValue',event.target.value)} />
    </>
  );
}


