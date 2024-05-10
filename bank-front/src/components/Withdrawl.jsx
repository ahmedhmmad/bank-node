import React from 'react';

function Withdraw() {
  return (
    <>
      <h3>User ID</h3>
      <label htmlFor="withdrawalAmount">Amount</label>
      <input type="number" id="withdrawalAmount" name="withdrawalAmount" />
    </>
  );
}

export default Withdraw;
