import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <h2>Welcome to the Dashboard!</h2>
      <nav>
        <ul>
          <li><Link to="/transfer">Transfer</Link></li>
          <li><Link to="/deposit">Deposit</Link></li>
          <li><Link to="/withdraw">Withdraw</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
