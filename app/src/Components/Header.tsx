// src/components/Header.tsx
import React from 'react';
import { Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const showTransactionHistoryButton = location.pathname !== '/transactions';

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem', 
      backgroundColor: '#1890ff', // Example color
      color: '#fff', // Text color
      }}>
      <h1 style={{ margin: 0 }}>Financial App</h1>
      <div>
        {showTransactionHistoryButton && (
          <Button type="default" onClick={() => navigate('/transactions')} style={{ marginRight: '10px' }}>
            Transaction History
          </Button>
        )}
        {!showTransactionHistoryButton && (
          <Button type="default" onClick={() => navigate('/balance')} style={{ marginRight: '10px' }}>
            Balance Enquiry
          </Button>
        )}
        <Button type="primary" onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;
