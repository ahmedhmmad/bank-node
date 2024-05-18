import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

const Dashboard = ({ userRole }) => {
  const renderActions = () => {
    switch (userRole) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard to="/transfer" label="Transfer" />
            <ActionCard to="/deposit" label="Deposit" />
            <ActionCard to="/withdraw" label="Withdraw" />
            <ActionCard to="/register" label="Register Clerk" />
            <ActionCard to="/deregister" label="Deregister Clerk" />
          </div>
        );
      case 'clerk':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard to="/transfer" label="Transfer" />
            <ActionCard to="/deposit" label="Deposit" />
            <ActionCard to="/withdraw" label="Withdraw" />
          </div>
        );
      case 'customer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard to="/transfer" label="Transfer" />
            <ActionCard to="/deposit" label="Deposit" />
            <ActionCard to="/withdraw" label="Withdraw" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Welcome to the Dashboard!</h2>
        <nav className="flex justify-center">
          {renderActions()}
        </nav>
      </div>
    </div>
  );
};

const ActionCard = ({ to, label }) => (
  <Link to={to} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="text-center">
      <h3 className="text-xl font-semibold">{label}</h3>
    </div>
  </Link>
);

export default Dashboard;
