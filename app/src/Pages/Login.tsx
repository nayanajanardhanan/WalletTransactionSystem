// src/Pages/Login.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import HeaderWithoutLogout from '../Components/HeaderWithoutLogout';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/login/', values);
      localStorage.setItem('token', response.data.access);
      message.success('Login successful');
      navigate('/balance');
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderWithoutLogout />
      <div style={{ maxWidth: 300, margin: '0 auto', paddingTop: 50 }}>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item name="email" label="Email" rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
              <Button type="default" onClick={() => navigate('/register')}>
                Register
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;