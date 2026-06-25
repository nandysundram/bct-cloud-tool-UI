import React, { useState } from 'react';
import DashboardLayout from './layout/DashboardLayout';
import DashboardHome from './features/DashboardHome';
import TerraformGenerator from './features/TerraformGenerator';
import ComplianceChecker from './features/ComplianceChecker';
import ImageToTerraform from './features/ImageToTerraform';
import FinOpsOptimizer from './features/FinOpsOptimizer';
import WellArchitected from './features/WellArchitected';
import AWSSecOps from './features/AWSSecOps';

interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const [activePage, setActivePage] = useState('dashboard');

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardHome setActivePage={setActivePage} />;
            case 'terraform-generator':
                return <TerraformGenerator />;
            case 'check-compliance':
                return <ComplianceChecker />;
            case 'image-to-terraform':
                return <ImageToTerraform />;
            case 'resource-optimization':
                return <FinOpsOptimizer />;
            case 'aws-well-architect':
                return <WellArchitected />;
            case 'aws-secops':
                return <AWSSecOps />;
            default:
                return <DashboardHome setActivePage={setActivePage} />;
        }
    };

    return (
        <DashboardLayout activePage={activePage} setActivePage={setActivePage} onLogout={onLogout}>
            {renderContent()}
        </DashboardLayout>
    );
};

export default Dashboard;
