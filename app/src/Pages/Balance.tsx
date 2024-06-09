// src/Pages/Balance.tsx
import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Header from '../Components/Header';

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/wallet/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (error) {
        message.error('Failed to fetch balance');
      }
    };
    fetchBalance();
  }, []);

  const handleDeposit = () => {
    navigate('/deposit');
  };

  const handleWithdraw = () => {
    navigate('/withdraw');
  };

  return (
    <div>
      <Header />
      <div style={{ maxWidth: 300, margin: '0 auto', paddingTop: 50 }}>
        <h2>Wallet Balance</h2>
        <p>{balance !== null ? `Balance: $${balance}` : 'Loading...'}</p>
        <Button type="primary" onClick={handleDeposit}>Deposit</Button>
        <Button type="primary" onClick={handleWithdraw} style={{ marginLeft: '10px' }}>Withdraw</Button>
      </div>
    </div>
  );
};

export default Balance;
