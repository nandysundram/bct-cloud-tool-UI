# Skylume S3 Deployment Script (PowerShell)
# Usage: .\deploy-to-s3.ps1 -BucketName "your-bucket-name"

param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName,
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Skylume S3 Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build the application
Write-Host "Step 1: Building application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "Build successful!" -ForegroundColor Green
Write-Host ""

# Step 2: Check if bucket exists
Write-Host "Step 2: Checking if bucket exists..." -ForegroundColor Yellow
$bucketExists = aws s3 ls "s3://$BucketName" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Bucket does not exist. Creating bucket..." -ForegroundColor Yellow
    aws s3 mb "s3://$BucketName" --region $Region
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Bucket created successfully!" -ForegroundColor Green
    } else {
        Write-Host "Failed to create bucket!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Bucket exists!" -ForegroundColor Green
}
Write-Host ""

# Step 3: Configure static website hosting
Write-Host "Step 3: Configuring static website hosting..." -ForegroundColor Yellow
aws s3 website "s3://$BucketName" --index-document index.html --error-document index.html

if ($LASTEXITCODE -eq 0) {
    Write-Host "Website hosting configured!" -ForegroundColor Green
} else {
    Write-Host "Warning: Could not configure website hosting" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Upload files
Write-Host "Step 4: Uploading files to S3..." -ForegroundColor Yellow
aws s3 sync dist/ "s3://$BucketName" --delete

if ($LASTEXITCODE -eq 0) {
    Write-Host "Files uploaded successfully!" -ForegroundColor Green
} else {
    Write-Host "Failed to upload files!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 5: Set content types
Write-Host "Step 5: Setting correct content types..." -ForegroundColor Yellow
aws s3 cp "s3://$BucketName" "s3://$BucketName" --recursive --exclude "*" --include "*.html" --content-type "text/html" --metadata-directive REPLACE
aws s3 cp "s3://$BucketName" "s3://$BucketName" --recursive --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE
aws s3 cp "s3://$BucketName" "s3://$BucketName" --recursive --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE

Write-Host "Content types set!" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your application is deployed at:" -ForegroundColor White
Write-Host "http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Ensure bucket policy allows public access" -ForegroundColor White
Write-Host "2. Add your BCT logo to the public folder" -ForegroundColor White
Write-Host "3. Consider setting up CloudFront for HTTPS" -ForegroundColor White
Write-Host ""
