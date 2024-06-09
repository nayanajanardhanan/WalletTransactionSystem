import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axiosInstance from '../axiosInstance';
import Header from '../Components/Header';

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axiosInstance.get('/wallet/transaction_details/', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTransactions(response.data);
        } else {
          message.error('User not authenticated');
        }
      } catch (error) {
        message.error('Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    { title: 'Amount', dataIndex: 'transaction_amount', key: 'transaction_amount' },
    { title: 'Type', dataIndex: 'transaction_type', key: 'transaction_type' },
    { title: 'Date and Time', dataIndex: 'date_and_time', key: 'date_and_time' },
  ];

  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <Table dataSource={transactions} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default TransactionHistory;
