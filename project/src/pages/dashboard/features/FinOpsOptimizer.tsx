import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { RocketOutlined, DollarOutlined, PieChartOutlined, BarChartOutlined, CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../../config/api';
import { useTheme } from '../../../contexts/ThemeContext';

const { Title, Paragraph, Text } = Typography;

const FinOpsOptimizer: React.FC = () => {
    const { isDarkMode } = useTheme();

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card
                className={`border ${isDarkMode ? 'border-blue-900 bg-slate-900' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'}`}
                cover={
                    <div className="h-48 overflow-hidden rounded-t-lg relative">
                        <img alt="cost-optimization" src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent flex items-center px-8">
                            <div>
                                <Title level={2} style={{ color: 'white', marginBottom: '0.5rem' }}>FinOps Optimizer</Title>
                                <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>Maximize cloud value with AI-driven cost optimization.</Paragraph>
                            </div>
                        </div>
                    </div>
                }
            >
                <Space size="large" className="w-full justify-between mb-6">
                    <Space><CheckCircleOutlined className="text-green-500" /> <Text className={isDarkMode ? 'text-gray-300' : ''}>Real-time monitoring</Text></Space>
                    <Space><CheckCircleOutlined className="text-green-500" /> <Text className={isDarkMode ? 'text-gray-300' : ''}>AI Recommendations</Text></Space>
                    <Space><CheckCircleOutlined className="text-green-500" /> <Text className={isDarkMode ? 'text-gray-300' : ''}>Multi-cloud visibility</Text></Space>
                </Space>

                <Row gutter={[24, 24]}>
                    <Col span={8}>
                        <Card title="Cost Reduction" bordered={false} className={`shadow-sm h-full ${isDarkMode ? 'bg-gray-800' : ''}`}>
                            <div className="text-center mb-4"><DollarOutlined style={{ fontSize: '32px', color: '#1890ff' }} /></div>
                            <Paragraph className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Identify waste and optimize resource allocation automatically.</Paragraph>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Budget Management" bordered={false} className={`shadow-sm h-full ${isDarkMode ? 'bg-gray-800' : ''}`}>
                            <div className="text-center mb-4"><PieChartOutlined style={{ fontSize: '32px', color: '#1890ff' }} /></div>
                            <Paragraph className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Set and track budgets with intelligent forecasting.</Paragraph>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Deep Analytics" bordered={false} className={`shadow-sm h-full ${isDarkMode ? 'bg-gray-800' : ''}`}>
                            <div className="text-center mb-4"><BarChartOutlined style={{ fontSize: '32px', color: '#1890ff' }} /></div>
                            <Paragraph className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Granular visibility into spending patterns.</Paragraph>
                        </Card>
                    </Col>
                </Row>

                <div className="text-center mt-8">
                    <Button
                        type="primary"
                        size="large"
                        icon={<RocketOutlined />}
                        href={API_ENDPOINTS.FINOPS_OPTIMIZER}
                        target="_blank"
                        className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        Launch FinOps Analyzer <ArrowRightOutlined />
                    </Button>
                    <Text type="secondary" className="block mt-2">Opens in a new tab</Text>
                </div>
            </Card>
        </Space>
    );
};

import { Space } from 'antd'; // Add missing import

export default FinOpsOptimizer;
