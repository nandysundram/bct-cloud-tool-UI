import React, { useState } from 'react';
import { Card, Select, Button, Typography, Row, Col, Statistic, Tag, List, Alert, Space, Upload, message, Tabs } from 'antd';
import { SafetyCertificateOutlined, CheckCircleOutlined, CloseCircleOutlined, FileZipOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../../config/api';
import { useTheme } from '../../../contexts/ThemeContext';

const { Paragraph, Text, Title } = Typography;
const { Dragger } = Upload;

const ComplianceChecker: React.FC = () => {
    const [selectedStandards, setSelectedStandards] = useState<string[]>(['NIST', 'GDPR', 'AWS CIS', 'PCI DSS', 'HIPAA']);
    const [zipBase64, setZipBase64] = useState<string | null>(null);
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState<string>('');

    const handleFileUpload = (info: any) => {
        const file = info.file;
        setFileName(file.name);
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            setZipBase64(base64);
            message.success(`${file.name} file uploaded successfully`);
        };
        reader.onerror = (error) => {
            console.error('Error reading zip file:', error);
            message.error('Failed to read zip file');
        };
        return false; // Prevent auto-upload
    };

    const handleCheck = async () => {
        if (!zipBase64 || selectedStandards.length === 0) {
            message.warning('Please upload a ZIP file and select at least one standard.');
            return;
        }
        setLoading(true);
        setResults(null);
        try {
            const response = await fetch(API_ENDPOINTS.COMPLIANCE_CHECKER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    zip_file: zipBase64,
                    standards: selectedStandards
                }),
            });
            const data = await response.json();
            if (data.compliance_report) {
                setResults(data.compliance_report);
                message.success('Compliance analysis complete!');
            } else {
                message.error(data.error || 'Failed to analyze compliance.');
            }
        } catch (error) {
            console.error(error);
            message.error('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStandardReport = (standardName: string, data: any) => {
        const passed = data?.passed?.length || 0;
        const failed = data?.violations?.length || 0;
        const total = passed + failed;
        const score = total > 0 ? Math.round((passed / total) * 100) : 0;

        return (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic title="Module Score" value={score} suffix="%" valueStyle={{ color: score > 80 ? '#3f8600' : '#cf1322' }} prefix={<SafetyCertificateOutlined />} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic title="Passed" value={passed} valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic title="Violations" value={failed} valueStyle={{ color: '#cf1322' }} prefix={<CloseCircleOutlined />} />
                        </Card>
                    </Col>
                </Row>

                {data?.violations?.length > 0 ? (
                    <Card title="Detected Violations" size="small" className="border-red-100">
                        <List
                            itemLayout="vertical"
                            dataSource={data.violations}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<CloseCircleOutlined className="text-red-500" />}
                                        title={<Text strong>{item.resource || 'Infrastructure Resource'}</Text>}
                                        description={
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <Text>{item.description}</Text>
                                                {item.remediation && (
                                                    <Alert
                                                        message="Remediation Path"
                                                        description={item.remediation}
                                                        type="warning"
                                                        showIcon
                                                        style={{ marginTop: 8 }}
                                                    />
                                                )}
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                ) : (
                    <Alert message="Full Compliance" description={`No violations found for ${standardName} standard in the provided project.`} type="success" showIcon />
                )}
            </Space>
        );
    };

    const renderResults = () => {
        if (!results) return null;

        const reportStandards = results.standards || {};
        const standardKeys = Object.keys(reportStandards);

        if (standardKeys.length === 0) return <Alert message="No Data" description="The analyzer couldn't find any compliance data in the response." type="warning" showIcon />;

        const tabItems = standardKeys.map(key => {
            // If the key is too long (e.g. a rule description), truncate it for the tab label
            const label = key.length > 20 ? `${key.substring(0, 20)}...` : key;
            return {
                key,
                label: <span title={key}>{label}</span>,
                children: renderStandardReport(key, reportStandards[key])
            };
        });

        return (
            <Card title="Compliance Analysis Report" className={`shadow-md ${isDarkMode ? 'bg-gray-900 border-gray-800' : ''}`}>
                {results.summary && (
                    <Row gutter={16} className="mb-6">
                        <Col span={24}>
                            <div className={`p-4 rounded-lg mb-4 flex justify-between items-center ${isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-100'}`}>
                                <Space align="center">
                                    <div className="text-2xl text-blue-500"><SafetyCertificateOutlined /></div>
                                    <div>
                                        <Title level={4} style={{ margin: 0, color: isDarkMode ? '#e5e7eb' : '#1e3a8a' }}>Executive Summary</Title>
                                        <Text type="secondary">Security Posture Assessment</Text>
                                    </div>
                                </Space>
                                <Space size="large">
                                    <Statistic
                                        title={<Text type="secondary">Total Violations</Text>}
                                        value={results.summary.total_violations}
                                        valueStyle={{ color: '#cf1322', fontWeight: 'bold' }}
                                    />
                                    <div className="text-center">
                                        <Text type="secondary" className="block text-xs mb-1">Overall Grade</Text>
                                        <Tag
                                            color={results.summary.overall_score === 'A' ? 'success' : results.summary.overall_score === 'B' ? 'processing' : 'warning'}
                                            style={{ fontSize: '18px', padding: '4px 12px', height: 'auto', fontWeight: 'bold' }}
                                        >
                                            {results.summary.overall_score}
                                        </Tag>
                                    </div>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                )}
                <Tabs
                    items={tabItems}
                    defaultActiveKey={standardKeys[0]}
                    type="card"
                    className="compliance-tabs"
                />
            </Card>
        );
    };

    const { isDarkMode } = useTheme();

    const standardsInfo = [
        { name: 'AWS CIS', desc: 'Secure benchmark for AWS resources.', color: 'blue' },
        { name: 'PCI DSS', desc: 'Payment card industry security.', color: 'purple' },
        { name: 'HIPAA', desc: 'Healthcare data privacy & security.', color: 'green' },
        { name: 'NIST', desc: 'Cybersecurity framework (800-53).', color: 'orange' },
        { name: 'GDPR', desc: 'EU data protection & privacy.', color: 'red' },
    ];

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title={<Space><SafetyCertificateOutlined className="text-green-500" /> Advanced Multi-Compliance Auditor</Space>}>
                <Paragraph type="secondary">Upload your Terraform modules (ZIP) to run deep security audits across multiple frameworks.</Paragraph>

                <div className="mb-6">
                    <Text strong className={`block mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Standard Frameworks:</Text>
                    <div className="flex flex-wrap gap-2">
                        {standardsInfo.map(s => (
                            <div key={s.name} className={`px-4 py-2 rounded-lg border flex-1 text-center min-w-[120px] ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                                <Tag color={s.color} className="m-0 text-sm">{s.name}</Tag>
                            </div>
                        ))}
                    </div>
                </div>

                <Title level={5}>Project Selection</Title>
                <div className="mb-6">
                    <Dragger
                        accept=".zip"
                        beforeUpload={(file) => {
                            handleFileUpload({ file });
                            return false;
                        }}
                        showUploadList={false}
                        className={`rounded-lg overflow-hidden transition-all ${isDarkMode ? 'bg-gray-800/50 border-gray-600 hover:border-blue-500' : 'bg-gray-50 border-gray-300 hover:border-blue-500'}`}
                        style={{ padding: '40px 20px' }}
                    >
                        <p className="ant-upload-drag-icon">
                            <FileZipOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                        </p>
                        <p className="ant-upload-text font-medium">{fileName ? `Selected: ${fileName}` : 'Click or drag Terraform ZIP to this area'}</p>
                        <p className="ant-upload-hint">Upload modules as a compressed archive for cross-module analysis.</p>
                    </Dragger>
                </div>

                <Row gutter={16} align="middle">
                    <Col xs={24} md={18} className="mb-4 md:mb-0">
                        <Select
                            mode="multiple"
                            placeholder="Select Compliance Standards"
                            style={{ width: '100%' }}
                            onChange={setSelectedStandards}
                            value={selectedStandards}
                            className="w-full"
                        >
                            {['AWS CIS', 'PCI DSS', 'HIPAA', 'NIST', 'GDPR'].map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
                        </Select>
                    </Col>
                    <Col xs={24} md={6}>
                        <Button
                            type="primary"
                            icon={<SafetyCertificateOutlined />}
                            onClick={handleCheck}
                            loading={loading}
                            disabled={!zipBase64 || selectedStandards.length === 0}
                            block
                            size="large"
                        >
                            Run Audit
                        </Button>
                    </Col>
                </Row>
            </Card>
            <div id="results-area">
                {renderResults()}
            </div>
        </Space>
    );
};

export default ComplianceChecker;

