import React from 'react';
import { Card, Typography, List, Button } from 'antd';
import { SafetyCertificateOutlined, ThunderboltOutlined, LockOutlined, CloudSyncOutlined, DollarCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../../config/api';
import { useTheme } from '../../../contexts/ThemeContext';

const { Title, Paragraph, Text } = Typography;

const pillars = [
    { title: 'Operational Excellence', icon: <img src="https://img.icons8.com/color/48/000000/process.png" className="w-8" />, desc: 'Run and monitor systems to deliver business value.' },
    { title: 'Security', icon: <LockOutlined className="text-2xl text-red-500" />, desc: 'Protect information, systems, and assets.' },
    { title: 'Reliability', icon: <CloudSyncOutlined className="text-2xl text-blue-500" />, desc: 'Ensure workloads perform correctly and consistently.' },
    { title: 'Performance Efficiency', icon: <ThunderboltOutlined className="text-2xl text-yellow-500" />, desc: 'Use computing resources efficiently.' },
    { title: 'Cost Optimization', icon: <DollarCircleOutlined className="text-2xl text-green-500" />, desc: 'Avoid unnecessary costs.' },
    { title: 'Sustainability', icon: <EnvironmentOutlined className="text-2xl text-green-600" />, desc: 'Minimize environmental impacts.' },
];

const WellArchitected: React.FC = () => {
    const { isDarkMode } = useTheme();
    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card
                className={`border ${isDarkMode ? 'border-green-900 bg-slate-900' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'}`}
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Title level={2} style={{ marginBottom: 0 }}>AWS Well-Architected Review</Title>
                        <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                            Assess your workload against the 6 pillars of the AWS Well-Architected Framework.
                        </Paragraph>
                    </div>
                    <Space size="large">
                        <Button
                            type="primary"
                            size="large"
                            icon={<SafetyCertificateOutlined />}
                            href={API_ENDPOINTS.AWS_WELL_ARCHITECT}
                            target="_blank"
                            className="bg-green-600 hover:bg-green-700 h-12 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            Open Analyzer
                        </Button>
                        <SafetyCertificateOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                    </Space>
                </div>

                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
                    dataSource={pillars}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                className={`h-full border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-green-100'}`}
                            >
                                <Space align="start">
                                    <div className="pt-1">{item.icon}</div>
                                    <div>
                                        <Title level={5} style={{ marginTop: 0 }}>{item.title}</Title>
                                        <Text type="secondary">{item.desc}</Text>
                                    </div>
                                </Space>
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
        </Space >
    );
};

import { Space } from 'antd';

export default WellArchitected;
