import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, Image, Row, Col } from 'antd';
import { CloudServerOutlined, UploadOutlined, CopyOutlined, RobotOutlined, FileTextOutlined, ArrowRightOutlined, DownloadOutlined } from '@ant-design/icons';
import { API_ENDPOINTS } from '../../../config/api';
import { useTheme } from '../../../contexts/ThemeContext';

const { Paragraph, Title, Text } = Typography;
const { Dragger } = Upload;

const ImageToTerraform: React.FC = () => {
    const [fileList, setFileList] = useState<any[]>([]);
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState('');
    const { isDarkMode } = useTheme();

    const [zipData, setZipData] = useState<string | null>(null);

    const handleUpload = async (options: any) => {
        const { file, onSuccess } = options;
        setFileList([file]);

        // Create preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setPreview(reader.result as string);

        // Simulate upload success for UI
        setTimeout(() => onSuccess("ok"), 0);
    };

    const handleGenerate = async () => {
        if (fileList.length === 0) return;
        setLoading(true);
        setZipData(null);
        setOutput('');
        const formData = new FormData();
        formData.append('image', fileList[0]);

        try {
            const response = await fetch(API_ENDPOINTS.IMAGE_TO_TERRAFORM, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.zip_file) {
                setZipData(data.zip_file);
                setOutput(`✅ Success! Generated ${data.file_count} Terraform modules.\n\n⬇️ Click the "Download ZIP" button below to save the project files.`);
                message.success('Modules generated successfully!');
            } else if (data.terraform_code) {
                setOutput(data.terraform_code);
                message.success('Code generated successfully!');
            } else {
                setOutput(data.raw_output || data.message || 'No code generated.');
            }
        } catch (error) {
            console.error(error);
            message.error('Failed to process image.');
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

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title={<Space><CloudServerOutlined className="text-purple-500" /> Image to Terraform</Space>}>
                <Paragraph type="secondary">Upload an architecture diagram and get corresponding Terraform code.</Paragraph>

                <div className={`p-6 mb-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-100'}`}>
                    <Title level={5} className={`mb-4 ${isDarkMode ? 'text-gray-200' : 'text-blue-800'}`}>How it Works</Title>
                    <Row gutter={16} align="middle">
                        <Col span={7} className="text-center">
                            <div className={`text-3xl mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}><UploadOutlined /></div>
                            <Text className={isDarkMode ? 'text-gray-300' : ''}>1. Upload Diagram</Text>
                        </Col>
                        <Col span={1} className="text-center"><ArrowRightOutlined className="text-gray-400" /></Col>
                        <Col span={8} className="text-center">
                            <div className={`text-3xl mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}><RobotOutlined /></div>
                            <Text className={isDarkMode ? 'text-gray-300' : ''}>2. AI Analysis</Text>
                        </Col>
                        <Col span={1} className="text-center"><ArrowRightOutlined className="text-gray-400" /></Col>
                        <Col span={7} className="text-center">
                            <div className={`text-3xl mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}><FileTextOutlined /></div>
                            <Text className={isDarkMode ? 'text-gray-300' : ''}>3. Get Code</Text>
                        </Col>
                    </Row>
                </div>

                <Dragger
                    accept="image/*"
                    customRequest={handleUpload}
                    showUploadList={false}
                    className={`mb-6 border-dashed border-2 rounded-lg transition-colors ${isDarkMode
                        ? 'bg-gray-800 border-gray-600 hover:border-blue-500'
                        : 'bg-gray-50 border-gray-300 hover:border-blue-500'}`}
                >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single image upload.</p>
                </Dragger>

                {preview && (
                    <div className="mb-6 text-center">
                        <Image src={preview} height={200} className="rounded-lg shadow-md" />
                    </div>
                )}

                <Space size="middle" style={{ width: '100%', justifyContent: 'center' }}>
                    <Button
                        type="primary"
                        onClick={handleGenerate}
                        loading={loading}
                        disabled={fileList.length === 0}
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


            {output && (
                <Card
                    title="Generated Code"
                    extra={<Button icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>}
                >
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                        {output}
                    </pre>
                </Card>
            )}
        </Space>
    );
};

export default ImageToTerraform;
