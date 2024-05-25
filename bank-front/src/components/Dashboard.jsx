import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import Transfer from './Transfer';
import Register from './Register.jsx';
import UserDetails from './UserDetails.jsx';

const Dashboard = ({ userRole,userId,username,balance }) => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const renderActions = () => {
    switch (userRole) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard label="Transfer" onClick={() => setCurrentComponent('transfer')} />
            <ActionCard label="Deposit" onClick={() => setCurrentComponent('deposit')} />
            <ActionCard label="Withdraw" onClick={() => setCurrentComponent('withdraw')} />
            <ActionCard label="Register" onClick={() => setCurrentComponent('register')} />
            <ActionCard label="Deregister" onClick={() => setCurrentComponent('deregister')} />
          </div>
        );
      case 'clerk':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard label="Transfer" onClick={() => setCurrentComponent('transfer')} />
            <ActionCard label="Deposit" onClick={() => setCurrentComponent('deposit')} />
            <ActionCard label="Withdraw" onClick={() => setCurrentComponent('withdraw')} />
          </div>
        );
      case 'customer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionCard label="Transfer" onClick={() => setCurrentComponent('transfer')} />
            <ActionCard label="Deposit" onClick={() => setCurrentComponent('deposit')} />
            <ActionCard label="Withdraw" onClick={() => setCurrentComponent('withdraw')} />
          </div>
        );
      default:
        return null;
    }
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'deposit':
        return <Deposit userRole={userRole} userId={userId} />;
      case 'withdraw':
        return <Withdrawal userRole={userRole} userId={userId}/>;
      case 'transfer':
        return <Transfer userRole={userRole}/>;
        case 'register':
          return <Register/>;
      
      default:
        return null;
    }
  };

  return (
    

    <div className="min-h-screen bg-gray-100">
      <Header />
      
      
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Welcome to the Dashboard!</h2>
        
        <UserDetails username={username} balance={balance}/>
        <nav className="flex justify-center">
          {renderActions()}
        </nav>
        <div className="mt-8">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ label, onClick }) => (
  <button 
    onClick={onClick} 
    className="bg-sky-500 hover:bg-sky-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full text-center"
  >
    <h3 className="text-xl font-semibold p-5 text-white">{label}</h3>
  </button>
);

export default Dashboard;
