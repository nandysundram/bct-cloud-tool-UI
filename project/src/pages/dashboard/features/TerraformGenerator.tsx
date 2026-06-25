import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space, message, Row, Col } from 'antd';
import { PlayCircleOutlined, CopyOutlined, CodeOutlined, CloudServerOutlined, CheckCircleOutlined, AppstoreOutlined, DownloadOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../../config/api';
import { useTheme } from '../../../contexts/ThemeContext';

const { Paragraph, Text } = Typography;
const { TextArea } = Input;

const TerraformGenerator: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [zipData, setZipData] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setZipData(null);
        setOutput('');
        try {
            const response = await fetch(API_ENDPOINTS.TERRAFORM_GENERATOR, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input }),
            });
            const data = await response.json();

            if (data.zip_file) {
                setZipData(data.zip_file);
                setOutput(`✅ Success! Generated ${data.file_count} Terraform modules.\n\n⬇️ Click the "Download ZIP" button above to save the project files.`);
                message.success('Modules generated successfully!');
            } else if (data.terraform_code) {
                setOutput(data.terraform_code);
                message.success('Terraform code generated successfully!');
            } else {
                setOutput(data.raw_output || data.message || 'No code generated.');
                if (data.status === 'error') message.warning('Could not structure into modules, showing raw output.');
            }
        } catch (error) {
            console.error(error);
            message.error('Failed to generate code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadZip = () => {
        if (!zipData) return;
        try {
            const binaryString = window.atob(zipData);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "application/zip" });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "terraform_modules.zip";
            link.click();
            message.success('Download started');
        } catch (err) {
            console.error(err);
            message.error('Failed to download zip');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        message.success('Copied to clipboard!');
    };

    const { isDarkMode } = useTheme();

    const capabilities = [
        { title: 'Multi-Cloud Support', desc: 'Generate code for AWS, Azure, and Google Cloud.', icon: <CloudServerOutlined className="text-blue-500" /> },
        { title: 'Best Practices', desc: 'Code follows industry standards and security guidelines.', icon: <CheckCircleOutlined className="text-green-500" /> },
        { title: 'Modular Output', desc: 'Clean, reusable modules for scalable infrastructure.', icon: <AppstoreOutlined className="text-purple-500" /> },
    ];

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title={<Space><CodeOutlined className="text-blue-500" /> Terraform Code Generator</Space>} className="shadow-sm">
                <Paragraph type="secondary">Describe your infrastructure requirements and get production-ready Terraform code.</Paragraph>
                <TextArea
                    rows={6}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your infrastructure needs... (e.g., 'Create an EC2 instance with security group allowing HTTP traffic')"
                    className={`mb-4 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : ''}`}
                />
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        onClick={handleGenerate}
                        loading={loading}
                        disabled={!input.trim()}
                        size="large"
                    >
                        Generate Terraform Code
                    </Button>
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={handleDownloadZip}
                        disabled={!zipData}
                        size="large"
                    >
                        Download ZIP
                    </Button>
                </Space>
            </Card>

            <Row gutter={[16, 16]}>
                {capabilities.map((cap, idx) => (
                    <Col xs={24} md={8} key={idx}>
                        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                            <Space align="start">
                                <div className="text-2xl">{cap.icon}</div>
                                <div>
                                    <Text strong className={`block ${isDarkMode ? 'text-gray-200' : ''}`}>{cap.title}</Text>
                                    <Text type="secondary" className={`text-sm ${isDarkMode ? 'text-gray-400' : ''}`}>{cap.desc}</Text>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            {
                output && (
                    <Card
                        title="Generated Code"
                        extra={<Button icon={<CopyOutlined />} onClick={copyToClipboard}>Copy</Button>}
                        className="shadow-sm bg-gray-50"
                    >
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                            {output}
                        </pre>
                    </Card>
                )
            }
        </Space >
    );
};

export default TerraformGenerator;
