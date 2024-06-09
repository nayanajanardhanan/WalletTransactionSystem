// src/Pages/Register.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import HeaderWithoutLogout from '../Components/HeaderWithoutLogout';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axiosInstance.post('/register/', values);
      message.success('Registration successful');
      navigate('/');
    } catch (error) {
      message.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderWithoutLogout displayLogin/>
      <div style={{ maxWidth: 300, margin: '0 auto', paddingTop: 50 }}>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[
            { required: true, message: 'Please input your email!' },
            {type: 'email', message: 'Please enter a valid email!'}
            ]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone No" rules={[{ pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;

