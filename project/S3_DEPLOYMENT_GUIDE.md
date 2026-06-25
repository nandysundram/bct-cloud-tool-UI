# Skylume - S3 Deployment Guide

## Prerequisites
- AWS Account with S3 access
- AWS CLI installed and configured
- Built production files (already done - in `dist` folder)

## Step 1: Create S3 Bucket

```bash
# Replace 'skylume-app' with your desired bucket name
aws s3 mb s3://skylume-app --region us-east-1
```

## Step 2: Configure Bucket for Static Website Hosting

```bash
aws s3 website s3://skylume-app --index-document index.html --error-document index.html
```

## Step 3: Update Bucket Policy for Public Access

Create a file named `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::skylume-app/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy --bucket skylume-app --policy file://bucket-policy.json
```

## Step 4: Disable Block Public Access

```bash
aws s3api put-public-access-block --bucket skylume-app --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

## Step 5: Upload Files to S3

```bash
# Navigate to project directory
cd project

# Upload all files from dist folder
aws s3 sync dist/ s3://skylume-app --delete

# Set correct content types
aws s3 cp s3://skylume-app s3://skylume-app --recursive --exclude "*" --include "*.html" --content-type "text/html" --metadata-directive REPLACE
aws s3 cp s3://skylume-app s3://skylume-app --recursive --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE
aws s3 cp s3://skylume-app s3://skylume-app --recursive --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE
```

## Step 6: Access Your Application

Your application will be available at:
```
http://skylume-app.s3-website-us-east-1.amazonaws.com
```

## Optional: Setup CloudFront CDN

For better performance and HTTPS support:

1. Create CloudFront Distribution:
```bash
aws cloudfront create-distribution --origin-domain-name skylume-app.s3-website-us-east-1.amazonaws.com
```

2. Note the CloudFront domain name from the output

3. Access via CloudFront URL (with HTTPS):
```
https://d1234567890.cloudfront.net
```

## Quick Deploy Script

Save this as `deploy.sh` in the project folder:

```bash
#!/bin/bash

BUCKET_NAME="skylume-app"
REGION="us-east-1"

echo "Building application..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "Setting content types..."
aws s3 cp s3://$BUCKET_NAME s3://$BUCKET_NAME --recursive --exclude "*" --include "*.html" --content-type "text/html" --metadata-directive REPLACE
aws s3 cp s3://$BUCKET_NAME s3://$BUCKET_NAME --recursive --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE
aws s3 cp s3://$BUCKET_NAME s3://$BUCKET_NAME --recursive --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE

echo "Deployment complete!"
echo "Access your app at: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run it:
```bash
./deploy.sh
```

## Important Notes

1. **Logo File**: Don't forget to place your BCT logo as `bct-logo.png` in the `public` folder before building

2. **API Endpoints**: Update the API endpoints in `src/config/api.ts` if needed

3. **Custom Domain**: To use a custom domain (e.g., skylume.yourdomain.com):
   - Register domain in Route 53
   - Create CloudFront distribution
   - Add SSL certificate via ACM
   - Point domain to CloudFront

4. **Cache Invalidation**: After updates, invalidate CloudFront cache:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Troubleshooting

- **403 Forbidden**: Check bucket policy and public access settings
- **404 on Refresh**: Ensure error document is set to `index.html`
- **Blank Page**: Check browser console for errors, verify API endpoints
- **Images Not Loading**: Ensure images are in the `public` folder before build

## AWS Console Alternative

If you prefer using AWS Console:

1. Go to S3 Console
2. Create bucket
3. Enable static website hosting in Properties
4. Upload files from `dist` folder
5. Set bucket policy for public access
6. Access via the S3 website endpoint

---

**Your application is now ready for deployment!**
