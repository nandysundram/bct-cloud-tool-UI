import React, { useState } from 'react';
import { Form, Input, Button, Progress, Typography, Card, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { supabase } from '../../config/supabase';



const { Title, Text } = Typography;
const { Link: TextLink } = Typography;

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const onValuesChange = (changedValues: any) => {
    if (changedValues.password && isSignUp) {
      setPasswordStrength(calculatePasswordStrength(changedValues.password));
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;

        if (data.session) {
          message.success('Account created successfully!');
          // AuthProvider will handle the redirect
        } else {
          message.success('Account created! Please check your email to verify.');
          setIsSignUp(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
        message.success('Successfully logged in!');
      }
    } catch (error: any) {
      message.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'exception';
    if (passwordStrength <= 3) return 'warning';
    return 'success';
  };

  return (
    <Card
      className="w-full max-w-md shadow-2xl rounded-2xl border-0"
      style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
    >
      <div className="text-center mb-8">
        <Title level={2} style={{ color: '#005BBB', marginBottom: 0 }}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </Title>
        <Text type="secondary">
          {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
        </Text>
      </div>

      <Form
        form={form}
        name="auth_form"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        onValuesChange={onValuesChange}
        requiredMark={false}
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="you@example.com"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            isSignUp ? { min: 8, message: 'Password must be at least 8 characters!' } : {},
            isSignUp ? { pattern: /[A-Z]/, message: 'Must contain uppercase letter!' } : {},
            isSignUp ? { pattern: /[a-z]/, message: 'Must contain lowercase letter!' } : {},
            isSignUp ? { pattern: /[0-9]/, message: 'Must contain number!' } : {},
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="••••••••"
            className="rounded-lg"
          />
        </Form.Item>

        {isSignUp && (
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <Text type="secondary" style={{ fontSize: '12px' }}>Password Strength</Text>
            </div>
            <Progress
              percent={(passwordStrength / 5) * 100}
              showInfo={false}
              status={getStrengthColor() as "success" | "exception" | "normal" | "active"}
              size="small"
              strokeLinecap="round"
            />
          </div>
        )}

        {isSignUp && (
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="••••••••"
              className="rounded-lg"
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="bg-blue-600 hover:bg-blue-700 h-12 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <TextLink
          onClick={() => {
            setIsSignUp(!isSignUp);
            form.resetFields();
            setPasswordStrength(0);
          }}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </TextLink>
      </div>
    </Card>
  );
};

export default AuthForm;
