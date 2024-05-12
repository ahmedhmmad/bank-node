import React, { useState } from 'react';

function Withdraw() {
    const [userInput,setUserInput]=useState({initialValue:0});
    function handleChange(inputIdentifier,newValue)
    {
        setUserInput((prevUserInput)=>{
            return{
                ...prevUserInput,[inputIdentifier]:newValue

            }
    });
}
  return (
    <>
      <h3>User ID</h3>
      <label htmlFor="withdrawalAmount">Amount</label>
      <input type="number" id="withdrawalAmount" name="withdrawalAmount" required  />
    </>
  );
}

export default Withdraw;
