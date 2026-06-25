// Deployment Configuration for S3 Hosting
// This file contains environment-specific settings for different deployment targets

export interface DeploymentConfig {
  environment: 'development' | 'staging' | 'production';
  s3Bucket?: string;
  cloudFrontDistribution?: string;
  apiGatewayUrl?: string;
  finOpsOptimizerUrl: string;
}

// Development environment (local development)
export const developmentConfig: DeploymentConfig = {
  environment: 'development',
  finOpsOptimizerUrl: 'http://cloudxcel-finops-agent-412099103-637641256.us-east-1.elb.amazonaws.com/'
};

// Staging environment (for testing before production)
export const stagingConfig: DeploymentConfig = {
  environment: 'staging',
  s3Bucket: 'cloudxcel-staging-bucket',
  cloudFrontDistribution: 'https://d1234567890.cloudfront.net',
  finOpsOptimizerUrl: 'http://cloudxcel-finops-agent-412099103-637641256.us-east-1.elb.amazonaws.com/'
};

// Production environment (S3 + CloudFront deployment)
export const productionConfig: DeploymentConfig = {
  environment: 'production',
  s3Bucket: 'cloudxcel-production-bucket',
  cloudFrontDistribution: 'https://cloudxcel.your-domain.com',
  apiGatewayUrl: 'https://api.your-domain.com',
  finOpsOptimizerUrl: 'http://cloudxcel-finops-agent-412099103-637641256.us-east-1.elb.amazonaws.com/'
};

// Get current deployment configuration based on environment
export const getCurrentConfig = (): DeploymentConfig => {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return productionConfig;
    case 'staging':
      return stagingConfig;
    default:
      return developmentConfig;
  }
};

// Helper function to get the FinOps Optimizer URL for current environment
export const getFinOpsOptimizerUrl = (): string => {
  return getCurrentConfig().finOpsOptimizerUrl;
};