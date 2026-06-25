# Quick S3 Deployment Guide

## ✅ Prerequisites Checklist
- [ ] AWS CLI installed (`aws --version`)
- [ ] AWS credentials configured (`aws configure`)
- [ ] BCT logo saved as `public/bct-logo.png`
- [ ] Production build completed (`npm run build`)

## 🚀 Quick Deploy (3 Steps)

### Option 1: Using PowerShell Script (Recommended)

```powershell
# Run the deployment script
.\deploy-to-s3.ps1 -BucketName "skylume-app"
```

### Option 2: Manual Commands

```bash
# 1. Build the app
npm run build

# 2. Create bucket (if needed)
aws s3 mb s3://skylume-app --region us-east-1

# 3. Upload files
aws s3 sync dist/ s3://skylume-app --delete

# 4. Enable website hosting
aws s3 website s3://skylume-app --index-document index.html --error-document index.html

# 5. Make bucket public
aws s3api put-public-access-block --bucket skylume-app --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 6. Apply bucket policy (update bucket-policy.json with your bucket name first)
aws s3api put-bucket-policy --bucket skylume-app --policy file://bucket-policy.json
```

## 🌐 Access Your App

After deployment, access at:
```
http://skylume-app.s3-website-us-east-1.amazonaws.com
```

## 🔄 Update Deployment

To update after making changes:

```bash
npm run build
aws s3 sync dist/ s3://skylume-app --delete
```

## 📝 Important Notes

1. **Replace `skylume-app`** with your actual bucket name
2. **Update `bucket-policy.json`** - Replace `BUCKET_NAME_HERE` with your bucket name
3. **Logo**: Place `bct-logo.png` in `public/` folder before building
4. **Region**: Change `us-east-1` to your preferred region

## 🆘 Troubleshooting

**Problem**: 403 Forbidden Error
**Solution**: 
```bash
aws s3api put-public-access-block --bucket skylume-app --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
aws s3api put-bucket-policy --bucket skylume-app --policy file://bucket-policy.json
```

**Problem**: Page refreshes show 404
**Solution**: Already configured - error document set to index.html

**Problem**: Images not loading
**Solution**: Ensure images are in `public/` folder before running `npm run build`

## 🎯 Production Checklist

Before deploying to production:
- [ ] Update API endpoints in `src/config/api.ts`
- [ ] Add BCT logo to `public/bct-logo.png`
- [ ] Test locally with `npm run build && npm run preview`
- [ ] Update bucket name in deployment scripts
- [ ] Configure CloudFront for HTTPS (optional but recommended)
- [ ] Set up custom domain (optional)

## 📞 Need Help?

Refer to `S3_DEPLOYMENT_GUIDE.md` for detailed instructions.
