// src/components/Header.tsx
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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
      <Button type="primary" onClick={handleLogout}>Logout</Button>
    </header>
  );
};

export default Header;
