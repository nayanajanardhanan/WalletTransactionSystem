// src/Pages/Withdraw.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import Header from '../Components/Header';

const Withdraw: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axiosInstance.post('/wallet/withdraw/', values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res)
        message.success('Withdrawal successful');
      } else {
        message.error('User not authenticated');
      }
    } catch (error:any) {
      console.log(error)
      if (error?.response && error?.response.data && error?.response?.data?.error) {
        
        message.error(error.response.data.error);
      }
      else{
        message.error("Withdrawal Failed")
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBalanceEnquiry = () => {
    navigate('/balance');
  };

  const handleDeposit = () => {
    navigate('/deposit');
  };

  return (
    <div>
      <Header />
      <div>
        <Form
          name="withdraw"
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
              Withdraw
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={handleBalanceEnquiry}>Balance Enquiry</Button>
          <Button type="primary" onClick={handleDeposit} style={{ marginLeft: '10px' }}>Deposit</Button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;