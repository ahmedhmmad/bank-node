import React from 'react';

function Transfer() {
  return (
    <>
      <h3>Transfer From</h3>
      <label htmlFor="transferFrom">User ID</label>
      <input type="text" id="transferFrom" name="transferFrom" />
      <h3>Transfer To</h3>
      <label htmlFor="transferTo">User ID</label>
      <input type="text" id="transferTo" name="transferTo" />
      <label htmlFor="transferAmount">Amount</label>
      <input type="number" id="transferAmount" name="transferAmount" />
    </>
  );
}

export default Transfer;
