import React from 'react';
import { Layout, Menu, Typography, Avatar, Dropdown, Space, Button } from 'antd';
import {
    HomeOutlined,
    CodeOutlined,
    SafetyCertificateOutlined,
    CloudServerOutlined,
    DollarOutlined,
    FileTextOutlined,
    UserOutlined,
    LogoutOutlined,
    BellOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { useAuth } from '../../../contexts/AuthProvider';
import { useTheme } from '../../../contexts/ThemeContext';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface DashboardLayoutProps {
    children: React.ReactNode;
    activePage: string;
    setActivePage: (page: string) => void;
    onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activePage, setActivePage, onLogout }) => {
    const { user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    const menuItems = [
        { key: 'dashboard', icon: <HomeOutlined />, label: 'Dashboard' },
        { key: 'terraform-generator', icon: <CodeOutlined />, label: 'Terraform Generator' },
        { key: 'check-compliance', icon: <SafetyCertificateOutlined />, label: 'Compliance Checker' },
        { key: 'image-to-terraform', icon: <CloudServerOutlined />, label: 'Image to Terraform' },
        { key: 'resource-optimization', icon: <DollarOutlined />, label: 'FinOps Optimizer' },
        { key: 'aws-secops', icon: <SafetyCertificateOutlined />, label: 'Security Assessment' },
        { key: 'aws-well-architect', icon: <FileTextOutlined />, label: 'Well-Architected' },
    ];

    const userMenuPoints = [
        { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
        { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
        { type: 'divider' },
        { key: 'logout', label: 'Sign Out', icon: <LogoutOutlined />, onClick: onLogout, danger: true },
    ];

    const getPageTitle = () => {
        const item = menuItems.find(i => i.key === activePage);
        return item ? item.label : 'Dashboard';
    };

    return (
        <Layout className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <Sider
                width={350}
                theme={isDarkMode ? 'dark' : 'light'}
                className={`border-r fixed h-full z-10 left-0 transition-colors duration-300 ${isDarkMode ? 'border-gray-700 shadow-xl' : 'border-gray-200 shadow-lg'
                    }`}
                style={{
                    boxShadow: '4px 0 24px rgba(0,0,0,0.08)'
                }}
            >
                <div className={`flex items-center gap-4 p-6 h-24 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                    <img src="/cloudxcel-logo.svg" alt="CloudXcel.AI" className="h-10 w-10 object-contain" />
                    <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">CloudXcel.AI</span>
                </div>

                <Menu
                    mode="inline"
                    theme={isDarkMode ? 'dark' : 'light'}
                    selectedKeys={[activePage]}
                    onClick={({ key }) => setActivePage(key)}
                    items={menuItems}
                    className="border-0 px-4 py-6 sidebar-menu"
                    style={{ fontSize: '16px', fontWeight: 500, background: 'transparent' }}
                    itemIcon={(props: any) => props.icon ? React.cloneElement(props.icon as React.ReactElement, { style: { fontSize: '20px' } }) : null}
                />

                <div className={`absolute bottom-0 w-full p-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'} glass-panel`}>
                    <div className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border ${isDarkMode
                        ? 'hover:bg-gray-800/50 border-transparent hover:border-gray-700'
                        : 'hover:bg-white/50 border-transparent hover:border-gray-200 shadow-sm hover:shadow-md'
                        }`}>
                        <Avatar size={48} className="shadow-md" style={{ backgroundColor: '#1890ff', backgroundImage: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)' }} icon={<UserOutlined />} />
                        <div className="flex-1 overflow-hidden">
                            <Text strong className={`block truncate text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{user?.name || 'User'}</Text>
                            <Text type="secondary" className="text-xs truncate block">{user?.email}</Text>
                        </div>
                    </div>
                </div>
            </Sider>

            <Layout className={`ml-[350px] transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <Header className={`px-8 h-20 flex items-center justify-between sticky top-0 z-10 shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'
                    }`}>
                    <Title level={3} style={{ margin: 0, color: isDarkMode ? 'white' : undefined }}>{getPageTitle()}</Title>
                    <Space size="large">
                        <Button
                            type="text"
                            shape="circle"
                            icon={isDarkMode ? <span style={{ fontSize: '20px' }}>☀️</span> : <span style={{ fontSize: '20px' }}>🌙</span>}
                            onClick={toggleTheme}
                            size="large"
                            className={isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-blue-600'}
                        />
                        <Button type="text" shape="circle" icon={<BellOutlined />} size="large" className={isDarkMode ? 'text-gray-300' : ''} />
                        <Dropdown menu={{ items: userMenuPoints as any }} placement="bottomRight">
                            <Space className="cursor-pointer p-2 rounded-lg transition-colors hover:bg-opacity-10 hover:bg-gray-500">
                                <Avatar style={{ backgroundColor: '#1890ff' }}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Avatar>
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>

                <Content className="p-8 min-h-[calc(100vh-80px)] overflow-initial">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
