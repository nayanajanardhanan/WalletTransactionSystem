// src/components/HeaderWithoutLogout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  displayLogin?: boolean;
}

const HeaderWithoutLogout: React.FC<HeaderProps> = ({ displayLogin }) => {
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
      {displayLogin && <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>}
      {!displayLogin && <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>}
    </header>
  );
};

export default HeaderWithoutLogout;
