import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Statistic, List, Avatar, Space, Button } from 'antd';
import {
    CodeOutlined,
    SafetyCertificateOutlined,
    DollarOutlined,
    RocketOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    WarningOutlined,
    CloudServerOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useCounter } from '../../../hooks/useCounter';
import { useAuth } from '../../../contexts/AuthProvider';

const { Text, Title } = Typography;

interface DashboardHomeProps {
    setActivePage: (page: string) => void;
}

const AnimatedStatistic: React.FC<{ title: string; value: number; suffix?: string; prefix: React.ReactNode; color: string; isDarkMode: boolean }> = ({ title, value, suffix = '', prefix, color, isDarkMode }) => {
    const count = useCounter(value);
    return (
        <Card bordered={false} className={`shadow-sm h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Statistic
                title={<span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{title}</span>}
                value={count}
                suffix={suffix}
                prefix={prefix}
                valueStyle={{ fontWeight: 'bold', color: color }}
            />
        </Card>
    );
};

const data = [
    { name: 'Mon', usage: 4000, cost: 2400 },
    { name: 'Tue', usage: 3000, cost: 1398 },
    { name: 'Wed', usage: 2000, cost: 9800 },
    { name: 'Thu', usage: 2780, cost: 3908 },
    { name: 'Fri', usage: 1890, cost: 4800 },
    { name: 'Sat', usage: 2390, cost: 3800 },
    { name: 'Sun', usage: 3490, cost: 4300 },
];

const DashboardHome: React.FC<DashboardHomeProps> = ({ setActivePage }) => {
    const { isDarkMode } = useTheme();
    const { user } = useAuth();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full space-y-8"
        >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="w-full">
                <div className={`p-8 rounded-2xl relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-white">
                            <Title level={2} style={{ color: 'white', margin: 0 }}>{greeting}, {user?.name || 'Engineer'}!</Title>
                            <Text className="text-blue-100 text-lg opacity-90 block mt-2">
                                Your cloud infrastructure is running smoothly. 3 optimizations available.
                            </Text>
                            <Button type="primary" size="large" className="mt-6 bg-white text-blue-600 border-none hover:bg-blue-50" onClick={() => setActivePage('resource-optimization')}>
                                View Optimizations
                            </Button>
                        </div>
                        <div className="hidden md:block">
                            <CloudServerOutlined style={{ fontSize: '120px', color: 'rgba(255,255,255,0.2)' }} />
                        </div>
                    </div>
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div variants={itemVariants}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <AnimatedStatistic title="Templates Generated" value={1050} suffix="+" prefix={<CodeOutlined />} color="#1890ff" isDarkMode={isDarkMode} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <AnimatedStatistic title="Compliance Rate" value={99} suffix="%" prefix={<SafetyCertificateOutlined />} color="#52c41a" isDarkMode={isDarkMode} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <AnimatedStatistic title="Cost Reduction" value={42} suffix="%" prefix={<DollarOutlined />} color="#faad14" isDarkMode={isDarkMode} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} className={`shadow-sm h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <Statistic
                                title={<span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Monitoring</span>}
                                value="Active"
                                prefix={<RocketOutlined className="text-purple-500" />}
                                valueStyle={{ fontWeight: 'bold', color: '#722ed1' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </motion.div>

            <Row gutter={[24, 24]}>
                {/* Resource Usage Graph */}
                <Col xs={24} lg={16}>
                    <motion.div variants={itemVariants} className="h-full">
                        <Card title="Cloud Resource Activity" bordered={false} className={`shadow-sm h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke={isDarkMode ? '#6b7280' : '#8884d8'} />
                                        <YAxis stroke={isDarkMode ? '#6b7280' : '#8884d8'} />
                                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#eee'} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: isDarkMode ? '#1f2937' : '#fff',
                                                borderColor: isDarkMode ? '#374151' : '#f0f0f0',
                                                color: isDarkMode ? '#fff' : '#000'
                                            }}
                                        />
                                        <Area type="monotone" dataKey="usage" stroke="#1890ff" fillOpacity={1} fill="url(#colorUsage)" />
                                        <Area type="monotone" dataKey="cost" stroke="#82ca9d" fillOpacity={1} fill="url(#colorCost)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </motion.div>
                </Col>

                {/* Recent Activity */}
                <Col xs={24} lg={8}>
                    <motion.div variants={itemVariants} className="h-full">
                        <Card title="Recent Activity" bordered={false} className={`shadow-sm h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <List
                                itemLayout="horizontal"
                                dataSource={[
                                    { title: 'Session Started', desc: 'Logged in successfully', time: 'Just now', icon: <CheckCircleOutlined />, color: 'green' },
                                    { title: 'EC2 template generated', desc: 'Production environment setup', time: '2 hours ago', icon: <CodeOutlined />, color: 'blue' },
                                    { title: 'Compliance check passed', desc: 'All security policies validated', time: '4 hours ago', icon: <CheckCircleOutlined />, color: 'green' },
                                    { title: 'Cost optimization alert', desc: 'Potential savings identified', time: '6 hours ago', icon: <WarningOutlined />, color: 'orange' },
                                    { title: 'Architecture processed', desc: 'Terraform code generated', time: '1 day ago', icon: <CloudServerOutlined />, color: 'purple' },
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar icon={item.icon} style={{ backgroundColor: `var(--ant-${item.color}-1)`, color: `var(--ant-${item.color}-6)` }} />
                                            }
                                            title={<Text strong className={isDarkMode ? 'text-gray-200' : ''}>{item.title}</Text>}
                                            description={
                                                <Space direction="vertical" size={2}>
                                                    <Text type="secondary" style={{ fontSize: '12px' }} className={isDarkMode ? 'text-gray-400' : ''}>{item.desc}</Text>
                                                    <Space size={4}>
                                                        <ClockCircleOutlined style={{ fontSize: '10px', color: '#8c8c8c' }} />
                                                        <Text type="secondary" style={{ fontSize: '10px' }} className={isDarkMode ? 'text-gray-500' : ''}>{item.time}</Text>
                                                    </Space>
                                                </Space>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
                <Card title="Quick Actions" bordered={false} className={`shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={6}>
                            <Button
                                block
                                size="large"
                                className={`h-auto py-4 flex items-center gap-4 text-left border-gray-200 hover:border-blue-500 hover:text-blue-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200' : ''}`}
                                onClick={() => setActivePage('terraform-generator')}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                    <CodeOutlined className="text-xl" />
                                </div>
                                <div>
                                    <Text strong className={`block ${isDarkMode ? 'text-gray-200' : ''}`}>Generate Template</Text>
                                    <Text type="secondary" className={`text-xs ${isDarkMode ? 'text-gray-400' : ''}`}>Create new infrastructure code</Text>
                                </div>
                            </Button>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Button
                                block
                                size="large"
                                className={`h-auto py-4 flex items-center gap-4 text-left border-gray-200 hover:border-blue-500 hover:text-blue-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200' : ''}`}
                                onClick={() => setActivePage('image-to-terraform')}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                                    <CloudServerOutlined className="text-xl" />
                                </div>
                                <div>
                                    <Text strong className={`block ${isDarkMode ? 'text-gray-200' : ''}`}>Upload Diagram</Text>
                                    <Text type="secondary" className={`text-xs ${isDarkMode ? 'text-gray-400' : ''}`}>Convert architecture to code</Text>
                                </div>
                            </Button>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Button
                                block
                                size="large"
                                className={`h-auto py-4 flex items-center gap-4 text-left border-gray-200 hover:border-blue-500 hover:text-blue-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200' : ''}`}
                                onClick={() => setActivePage('resource-optimization')}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>
                                    <DollarOutlined className="text-xl" />
                                </div>
                                <div>
                                    <Text strong className={`block ${isDarkMode ? 'text-gray-200' : ''}`}>FinOps Optimizer</Text>
                                    <Text type="secondary" className={`text-xs ${isDarkMode ? 'text-gray-400' : ''}`}>Optimize costs & operations</Text>
                                </div>
                            </Button>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Button
                                block
                                size="large"
                                className={`h-auto py-4 flex items-center gap-4 text-left border-gray-200 hover:border-blue-500 hover:text-blue-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200' : ''}`}
                                onClick={() => setActivePage('check-compliance')}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`}>
                                    <SafetyCertificateOutlined className="text-xl" />
                                </div>
                                <div>
                                    <Text strong className={`block ${isDarkMode ? 'text-gray-200' : ''}`}>Security Scan</Text>
                                    <Text type="secondary" className={`text-xs ${isDarkMode ? 'text-gray-400' : ''}`}>Check compliance status</Text>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </motion.div>

            {/* Platform Features Grid */}
            <motion.div variants={itemVariants}>
                <Card title="Core Platform Features" bordered={false} className={`shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <Row gutter={[16, 16]}>
                        {[
                            { title: 'AI Code Generation', desc: 'Generate production-ready Terraform code', icon: <CodeOutlined /> },
                            { title: 'Diagram to Code', desc: 'Convert architecture diagrams into code', icon: <CloudServerOutlined /> },
                            { title: 'Security Scanning', desc: 'Automated compliance checking', icon: <SafetyCertificateOutlined /> },
                            { title: 'FinOps Optimization', desc: 'Real-time cost analysis', icon: <DollarOutlined /> },
                            { title: 'Well-Architected', desc: 'Assess against AWS best practices', icon: <FileTextOutlined /> },
                            { title: 'Policy as Code', desc: 'Enforce organizational policies', icon: <CheckCircleOutlined /> }
                        ].map((feature, idx) => (
                            <Col xs={24} sm={12} md={8} key={idx}>
                                <Card
                                    type="inner"
                                    bodyStyle={{ padding: '16px' }}
                                    className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-0'} h-full transition-colors duration-300`}
                                >
                                    <Space align="start">
                                        <div className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} text-lg pt-1`}>{feature.icon}</div>
                                        <div>
                                            <Text strong className={`block ${isDarkMode ? 'text-gray-200' : ''}`}>{feature.title}</Text>
                                            <Text type="secondary" className={`text-xs ${isDarkMode ? 'text-gray-400' : ''}`}>{feature.desc}</Text>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default DashboardHome;


