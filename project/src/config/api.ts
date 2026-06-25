// API Configuration for CloudXcel.AI Platform
// Update these URLs when deploying to different environments

export const API_ENDPOINTS = {
  // Terraform Code Generator
  TERRAFORM_GENERATOR: 'https://2jpdo3bst2rvpzymhebdgvgnma0msplp.lambda-url.ap-southeast-1.on.aws/',

  // Compliance Checker
  COMPLIANCE_CHECKER: 'https://kfjskb3ttrvcclvb7rw4t3d2na0aebcl.lambda-url.ap-southeast-1.on.aws/',

  // Image to Terraform Converter
  IMAGE_TO_TERRAFORM: 'https://2jpdo3bst2rvpzymhebdgvgnma0msplp.lambda-url.ap-southeast-1.on.aws/',

  // FinOps Optimizer - Load Balancer URL (similar to AWS Well-Architected Analyzer)
  FINOPS_OPTIMIZER: 'http://cloudxcel-finops-agent-412099103-637641256.us-east-1.elb.amazonaws.com/',

  // AWS Well-Architected Analyzer
  AWS_WELL_ARCHITECT: 'http://WA-IaC-Front-kAGyQ2W0FMMf-96940035.us-east-1.elb.amazonaws.com/'
};

// Environment-specific configuration
export const getApiEndpoint = (service: keyof typeof API_ENDPOINTS): string => {
  return API_ENDPOINTS[service];
};