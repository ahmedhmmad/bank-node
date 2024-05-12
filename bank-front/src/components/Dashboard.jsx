import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

const Dashboard = ({ userRole }) => {
  const renderActions = () => {
    switch (userRole) {
      case 'admin':
        return (
          <ul>
            <li><Link to="/transfer">Transfer</Link></li>
            <li><Link to="/deposit">Deposit</Link></li>
            <li><Link to="/withdraw">Withdraw</Link></li>
            <li><Link to="/register-clerk">Register Clerk</Link></li>
            <li><Link to="/deregister-clerk">Deregister Clerk</Link></li>
          </ul>
        );
      case 'clerk':
        return (
          <ul>
            <li><Link to="/transfer">Transfer</Link></li>
            <li><Link to="/deposit">Deposit</Link></li>
            <li><Link to="/withdraw">Withdraw</Link></li>
          </ul>
        );
      case 'customer':
        return (
          <ul>
            <li><Link to="/transfer">Transfer</Link></li>
            <li><Link to="/deposit">Deposit</Link></li>
            <li><Link to="/withdraw">Withdraw</Link></li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header/>
      <h2>Welcome to the Dashboard!</h2>
      <nav>
        {renderActions()}
      </nav>
    </div>
  );
};

export default Dashboard;
