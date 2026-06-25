import React from 'react';
import { Layout, Menu, Button, Typography, Row, Col, Card, Input, Space, Form } from 'antd';
import {
    CodeOutlined,
    SafetyCertificateOutlined,
    CloudServerOutlined,
    RocketOutlined,
    GithubOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import AuthForm from '../../components/auth/AuthForm';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface LandingPageProps { }

const LandingPage: React.FC<LandingPageProps> = () => {
    return (
        <Layout className="min-h-screen bg-white">
            <Header className="fixed w-full z-10 flex justify-between items-center bg-white/90 backdrop-blur-md shadow-sm px-6 md:px-12 h-20">
                <div className="flex items-center gap-3">
                    <img src="/cloudxcel-logo.svg" alt="CloudXcel.AI" className="h-10" />
                    <div className="leading-tight">
                        <Title level={4} style={{ margin: 0, color: '#001529' }}>CloudXcel.AI</Title>
                        <Text type="secondary" style={{ fontSize: '10px', letterSpacing: '1px' }}>CLOUD AUTOMATION</Text>
                    </div>
                </div>
                <Menu
                    mode="horizontal"
                    disabledOverflow
                    className="bg-transparent border-0 min-w-[300px] justify-end hidden md:flex"
                    items={[
                        { key: 'features', label: <a href="#features">Features</a> },
                        { key: 'blog', label: <a href="#blog">Blog</a> },
                        { key: 'contact', label: <a href="#contact">Contact</a> },
                    ]}
                />
                <Button type="primary" size="large" href="#contact" className="md:hidden">Get Started</Button>
            </Header>

            <Content className="pt-20">
                {/* Hero Section */}
                <div className="py-24 px-6 md:px-12 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="max-w-7xl mx-auto">
                        <Row gutter={[48, 48]} align="middle">
                            <Col xs={24} lg={12}>
                                <Title level={1} style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #1890ff, #722ed1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Transform Your Cloud Infrastructure with AI
                                </Title>
                                <Title level={3} type="secondary" style={{ fontWeight: 400, marginBottom: '2rem' }}>
                                    CloudXcel.AI's unified Cloud Infrastructure Automation Portal. Generate Terraform code, ensure compliance, and optimize costs.
                                </Title>
                                <Space size="large" className="mb-8">
                                    <Space><RocketOutlined className="text-blue-500" /> AI-Powered Generation</Space>
                                    <Space><SafetyCertificateOutlined className="text-green-500" /> Compliance Checking</Space>
                                </Space>
                            </Col>
                            <Col xs={24} lg={12}>
                                <AuthForm />
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto text-center mb-16">
                        <Title level={2}>Powerful Features</Title>
                        <Paragraph className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Everything you need to manage your cloud infrastructure efficiently
                        </Paragraph>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <Row gutter={[32, 32]}>
                            {[
                                { title: 'Terraform Generator', icon: <CodeOutlined />, desc: 'Generate production-ready Terraform code from natural language descriptions.' },
                                { title: 'Compliance Checker', icon: <SafetyCertificateOutlined />, desc: 'Validate your infrastructure against CIS, PCI DSS, HIPAA, and NIST standards.' },
                                { title: 'Image to Terraform', icon: <CloudServerOutlined />, desc: 'Upload architecture diagrams and automatically generate corresponding Terraform code.' },
                                { title: 'FinOps Optimizer', icon: <RocketOutlined />, desc: 'Optimize AWS costs and manage financial operations with comprehensive analysis tools.' },
                                { title: 'AWS Well-Architected', icon: <SafetyCertificateOutlined />, desc: 'Review your architecture against AWS Well-Architected Framework best practices.' },
                                { title: 'Security Assessment', icon: <SafetyCertificateOutlined />, desc: 'Comprehensive Cloud Security Posture Assessment across IAM, Network, Data Protection, Logging & Workload Security.' },
                            ].map((feature, idx) => (
                                <Col xs={24} md={12} lg={8} key={idx}>
                                    <Card hoverable className="h-full border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 text-2xl">
                                            {feature.icon}
                                        </div>
                                        <Title level={4}>{feature.title}</Title>
                                        <Paragraph type="secondary">{feature.desc}</Paragraph>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                {/* Blog Section */}
                <div id="blog" className="py-24 px-6 md:px-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto text-center mb-16">
                        <Title level={2}>Latest Insights</Title>
                    </div>
                    <div className="max-w-7xl mx-auto">
                        <Row gutter={[32, 32]}>
                            {[
                                { img: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', title: 'Best Practices for Terraform in 2024', date: 'Dec 15, 2024' },
                                { img: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', title: 'Cloud Security Compliance Guide', date: 'Dec 10, 2024' },
                                { img: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop', title: 'FinOps: Optimizing Cloud Costs', date: 'Dec 5, 2024' },
                            ].map((post, idx) => (
                                <Col xs={24} md={8} key={idx}>
                                    <Card
                                        hoverable
                                        cover={<img alt={post.title} src={post.img} className="h-48 object-cover" />}
                                        className="overflow-hidden rounded-xl border-0 shadow-md"
                                    >
                                        <Text type="secondary" className="block mb-2 text-blue-600">{post.date}</Text>
                                        <Title level={4} style={{ marginBottom: '0.5rem' }}>{post.title}</Title>
                                        <Button type="link" className="p-0">Read More →</Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                {/* Contact Section */}
                <div id="contact" className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <Row gutter={[64, 64]}>
                            <Col xs={24} md={12}>
                                <Title level={2}>Get in Touch</Title>
                                <Paragraph className="text-lg text-gray-500 mb-8">
                                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                                </Paragraph>
                                <Space direction="vertical" size="large" className="w-full">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><MailOutlined /></div>
                                        <div><Text strong className="block">Email</Text><Text type="secondary">global@bahwancybertek.com</Text></div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><PhoneOutlined /></div>
                                        <div><Text strong className="block">Phone</Text><Text type="secondary">+91 44 43449000</Text></div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><EnvironmentOutlined /></div>
                                        <div><Text strong className="block">Office</Text><Text type="secondary">Chennai - 600 097</Text></div>
                                    </div>
                                </Space>
                                <Space className="mt-8" size="middle">
                                    <Button shape="circle" icon={<GithubOutlined />} size="large" />
                                    <Button shape="circle" icon={<LinkedinOutlined />} size="large" />
                                    <Button shape="circle" icon={<TwitterOutlined />} size="large" />
                                </Space>
                            </Col>
                            <Col xs={24} md={12}>
                                <Card className="rounded-2xl shadow-lg border-0 bg-gray-50 p-4">
                                    <Form layout="vertical" size="large">
                                        <Form.Item label="Name"><Input placeholder="Your name" /></Form.Item>
                                        <Form.Item label="Email"><Input placeholder="you@example.com" /></Form.Item>
                                        <Form.Item label="Message"><TextArea rows={4} placeholder="Your message..." /></Form.Item>
                                        <Button type="primary" block size="large" className="bg-blue-600">Send Message</Button>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Content>

            <Footer className="bg-[#001529] text-white py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={6}>
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/cloudxcel-logo.svg" alt="CloudXcel.AI" className="h-8" />
                                <span className="text-lg font-bold">CloudXcel.AI</span>
                            </div>
                            <Text className="text-gray-400 block mb-2">Unified Cloud Infrastructure Automation Platform by CloudXcel.AI</Text>
                        </Col>
                        <Col xs={24} md={6}>
                            <Title level={5} style={{ color: 'white' }}>Product</Title>
                            <Space direction="vertical" className="text-gray-400">
                                <a href="#features" className="hover:text-white">Features</a>
                                <a href="#" className="hover:text-white">Pricing</a>
                                <a href="#" className="hover:text-white">Documentation</a>
                            </Space>
                        </Col>
                        <Col xs={24} md={6}>
                            <Title level={5} style={{ color: 'white' }}>Company</Title>
                            <Space direction="vertical" className="text-gray-400">
                                <a href="#blog" className="hover:text-white">Blog</a>
                                <a href="#" className="hover:text-white">About</a>
                                <a href="#contact" className="hover:text-white">Contact</a>
                            </Space>
                        </Col>
                        <Col xs={24} md={6}>
                            <Title level={5} style={{ color: 'white' }}>Legal</Title>
                            <Space direction="vertical" className="text-gray-400">
                                <a href="#" className="hover:text-white">Privacy</a>
                                <a href="#" className="hover:text-white">Terms</a>
                                <a href="#" className="hover:text-white">Security</a>
                            </Space>
                        </Col>
                    </Row>
                    <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                        <Text className="text-gray-500">© 2025 CloudXcel.AI. All rights reserved.</Text>
                    </div>
                </div>
            </Footer>
        </Layout>
    );
};

export default LandingPage;
