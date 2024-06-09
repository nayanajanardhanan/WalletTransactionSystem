// src/Pages/Deposit.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Header from '../Components/Header';

const Deposit: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axiosInstance.post('/wallet/deposit/', values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success('Deposit successful');
      } else {
        message.error('User not authenticated');
      }
    } catch (error) {
      message.error('Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = () => {
    navigate('/withdraw');
  };

  const handleBalanceEnquiry = () => {
    navigate('/balance');
  };

  return (
    <div>
      <Header />
      <div>
        <Form
          name="deposit"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 300, margin: '0 auto', paddingTop: 50 }}
        >
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Deposit
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={handleWithdraw}>Withdraw</Button>
          <Button type="primary" onClick={handleBalanceEnquiry} style={{ marginLeft: '10px' }}>Balance Enquiry</Button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;