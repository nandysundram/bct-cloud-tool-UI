import React from 'react';
import { Card, Typography, Row, Col, Button, Tag, Progress, Space } from 'antd';
import {
    SafetyCertificateOutlined,
    LockOutlined,
    GlobalOutlined,
    EyeOutlined,
    CloudOutlined,
    UserOutlined,
    CheckCircleOutlined,
    ArrowRightOutlined,
    SecurityScanOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../contexts/ThemeContext';

const { Title, Paragraph, Text } = Typography;

const AWSSecOps: React.FC = () => {
    const { isDarkMode } = useTheme();

    const pillars = [
        {
            title: 'IAM',
            subtitle: 'Identity & Access Management',
            icon: <UserOutlined className="text-3xl" />,
            color: '#3B82F6',
            bgLight: 'from-blue-50 to-blue-100',
            bgDark: 'from-blue-900/30 to-blue-800/20',
            desc: 'Evaluate IAM policies, roles, and access controls. Ensure least-privilege access, MFA enforcement, and proper identity governance across your AWS environment.',
            checks: ['MFA Enforcement', 'Least Privilege', 'Role-Based Access', 'Password Policies', 'Access Key Rotation'],
            score: 85
        },
        {
            title: 'Network Security',
            subtitle: 'Perimeter & Traffic Controls',
            icon: <GlobalOutlined className="text-3xl" />,
            color: '#10B981',
            bgLight: 'from-emerald-50 to-green-100',
            bgDark: 'from-emerald-900/30 to-green-800/20',
            desc: 'Assess VPC configurations, security groups, NACLs, and network segmentation. Identify exposed endpoints and validate traffic flow controls.',
            checks: ['VPC Configuration', 'Security Groups', 'NACLs', 'Public Exposure', 'Flow Logs'],
            score: 78
        },
        {
            title: 'Data Protection',
            subtitle: 'Encryption & Data Security',
            icon: <LockOutlined className="text-3xl" />,
            color: '#8B5CF6',
            bgLight: 'from-violet-50 to-purple-100',
            bgDark: 'from-violet-900/30 to-purple-800/20',
            desc: 'Review encryption-at-rest and in-transit configurations, key management practices, S3 bucket policies, and data classification strategies.',
            checks: ['Encryption at Rest', 'Encryption in Transit', 'KMS Key Management', 'S3 Bucket Policies', 'Data Classification'],
            score: 92
        },
        {
            title: 'Logging & Monitoring',
            subtitle: 'Visibility & Observability',
            icon: <EyeOutlined className="text-3xl" />,
            color: '#F59E0B',
            bgLight: 'from-amber-50 to-yellow-100',
            bgDark: 'from-amber-900/30 to-yellow-800/20',
            desc: 'Evaluate CloudTrail, CloudWatch, and VPC Flow Logs configurations. Ensure comprehensive audit trails, alerting mechanisms, and incident response readiness.',
            checks: ['CloudTrail Enabled', 'CloudWatch Alarms', 'VPC Flow Logs', 'Config Rules', 'Event Notifications'],
            score: 70
        },
        {
            title: 'Workload Security',
            subtitle: 'Compute & Runtime Protection',
            icon: <CloudOutlined className="text-3xl" />,
            color: '#EF4444',
            bgLight: 'from-red-50 to-rose-100',
            bgDark: 'from-red-900/30 to-rose-800/20',
            desc: 'Analyze EC2 instance security, container configurations, Lambda function permissions, and runtime protection measures across your workloads.',
            checks: ['Instance Hardening', 'Container Security', 'Lambda Permissions', 'Patch Management', 'Runtime Protection'],
            score: 81
        }
    ];

    const getScoreColor = (score: number) => {
        if (score >= 90) return '#10B981';
        if (score >= 75) return '#F59E0B';
        return '#EF4444';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 90) return 'Excellent';
        if (score >= 75) return 'Good';
        if (score >= 60) return 'Needs Improvement';
        return 'Critical';
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <Card
                className={`border-0 overflow-hidden ${isDarkMode ? 'bg-gray-800' : ''}`}
                cover={
                    <div className="h-72 overflow-hidden rounded-t-lg relative">
                        <img
                            alt="security-assessment"
                            src="https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=1200&q=80"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40 flex items-center px-8 md:px-12">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <SecurityScanOutlined className="text-3xl text-blue-400" />
                                    <Tag color="blue" className="text-sm px-3 py-1 border-0 rounded-full font-medium">CSPA Framework</Tag>
                                </div>
                                <Title level={1} style={{ color: 'white', marginBottom: '0.75rem', fontSize: '2.5rem' }}>
                                    Cloud Security Posture Assessment
                                </Title>
                                <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', marginBottom: '2rem', maxWidth: '600px' }}>
                                    Comprehensive security assessment across 5 critical pillars. Identify vulnerabilities, enforce best practices, and strengthen your cloud security posture.
                                </Paragraph>
                                <Space size="middle">
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<SafetyCertificateOutlined />}
                                        className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-full text-lg font-semibold shadow-lg hover:shadow-blue-500/40 border-none hover:-translate-y-1 transition-all"
                                        onClick={() => window.open('http://cloudxcel-cspa-agent-1575281111-744372133.us-east-1.elb.amazonaws.com', '_blank')}
                                    >
                                        Start Assessment
                                    </Button>
                                    <Button
                                        size="large"
                                        ghost
                                        className="h-14 px-8 rounded-full text-lg font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all"
                                    >
                                        View Reports
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </div>
                }
            >
                {/* Overall Score Card */}
                <div className={`-mt-2 mb-6 p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'}`}>
                    <Row gutter={[24, 16]} align="middle">
                        <Col xs={24} md={8}>
                            <div className="text-center md:text-left">
                                <Text className={`text-sm font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Overall Security Score
                                </Text>
                                <div className="flex items-baseline gap-2 mt-1 justify-center md:justify-start">
                                    <span className="text-5xl font-bold" style={{ color: getScoreColor(81) }}>81</span>
                                    <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/100</span>
                                </div>
                                <Tag color={getScoreColor(81)} className="mt-2 rounded-full px-3 border-0 font-medium">{getScoreLabel(81)}</Tag>
                            </div>
                        </Col>
                        <Col xs={24} md={16}>
                            <Row gutter={[16, 8]}>
                                {pillars.map((pillar) => (
                                    <Col xs={12} sm={8} md={Math.floor(24 / 5)} key={pillar.title} className="text-center">
                                        <Progress
                                            type="circle"
                                            percent={pillar.score}
                                            size={56}
                                            strokeColor={pillar.color}
                                            trailColor={isDarkMode ? '#374151' : '#E5E7EB'}
                                            format={(percent) => <span className="text-xs font-bold">{percent}</span>}
                                        />
                                        <Text className={`block text-xs mt-1 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {pillar.title}
                                        </Text>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </div>

                {/* 5 Pillars Grid */}
                <Title level={3} className={`mb-6 ${isDarkMode ? 'text-gray-100' : ''}`}>
                    <SafetyCertificateOutlined className="mr-2 text-blue-500" />
                    Assessment Pillars
                </Title>
                <Row gutter={[20, 20]}>
                    {pillars.map((pillar, idx) => (
                        <Col xs={24} md={12} lg={8} key={idx}>
                            <Card
                                hoverable
                                className={`h-full border overflow-hidden transition-all duration-300 hover:shadow-xl ${isDarkMode
                                    ? 'bg-gray-800 border-gray-700 hover:border-gray-500'
                                    : 'bg-white border-gray-100 hover:border-gray-200'
                                    }`}
                                styles={{ body: { padding: '24px' } }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className={`p-3 rounded-xl bg-gradient-to-br ${isDarkMode ? pillar.bgDark : pillar.bgLight}`}
                                        style={{ color: pillar.color }}
                                    >
                                        {pillar.icon}
                                    </div>
                                    <div className="text-right">
                                        <Progress
                                            type="circle"
                                            percent={pillar.score}
                                            size={48}
                                            strokeColor={getScoreColor(pillar.score)}
                                            trailColor={isDarkMode ? '#374151' : '#E5E7EB'}
                                            format={(percent) => <span className="text-xs font-bold">{percent}</span>}
                                        />
                                    </div>
                                </div>

                                <Title level={4} className={`mt-0 mb-1 ${isDarkMode ? 'text-gray-100' : ''}`}>
                                    {pillar.title}
                                </Title>
                                <Text className={`text-xs font-medium block mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {pillar.subtitle}
                                </Text>

                                <Paragraph className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} ellipsis={{ rows: 3 }}>
                                    {pillar.desc}
                                </Paragraph>

                                <div className="flex gap-1.5 flex-wrap">
                                    {pillar.checks.map(check => (
                                        <Tag
                                            key={check}
                                            className={`rounded-full text-xs border-0 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {check}
                                        </Tag>
                                    ))}
                                </div>

                                <Button
                                    type="link"
                                    className="p-0 mt-4 font-medium"
                                    style={{ color: pillar.color }}
                                    icon={<ArrowRightOutlined />}
                                    iconPosition="end"
                                >
                                    View Details
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>

            {/* Assessment Workflow */}
            <Card
                title={
                    <Space>
                        <CheckCircleOutlined className="text-blue-500" />
                        <span>How CSPA Assessment Works</span>
                    </Space>
                }
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : ''} shadow-sm`}
                bordered={false}
            >
                <Row gutter={[24, 24]}>
                    {[
                        {
                            step: '01',
                            title: 'Connect Your AWS Account',
                            desc: 'Securely link your AWS environment using IAM roles with read-only access for a non-intrusive assessment.',
                            color: '#3B82F6'
                        },
                        {
                            step: '02',
                            title: 'Automated Discovery & Scan',
                            desc: 'The CSPA agent automatically discovers resources and evaluates them against the 5 security pillars.',
                            color: '#10B981'
                        },
                        {
                            step: '03',
                            title: 'Risk Scoring & Analysis',
                            desc: 'Each pillar receives a risk score with detailed findings, severity levels, and affected resources.',
                            color: '#F59E0B'
                        },
                        {
                            step: '04',
                            title: 'Remediation & Reporting',
                            desc: 'Get actionable remediation steps, exportable reports, and continuous monitoring for ongoing compliance.',
                            color: '#8B5CF6'
                        }
                    ].map((item, idx) => (
                        <Col xs={24} sm={12} md={6} key={idx}>
                            <div className={`text-center p-6 rounded-xl h-full border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'
                                }`}>
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white"
                                    style={{ backgroundColor: item.color }}
                                >
                                    {item.step}
                                </div>
                                <Title level={5} className={`mb-2 ${isDarkMode ? 'text-gray-200' : ''}`}>
                                    {item.title}
                                </Title>
                                <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {item.desc}
                                </Text>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
};

export default AWSSecOps;
