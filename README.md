# everyone-loves-leo

Fan site for Leo the French Bulldog — Fashion Icon, Distinguished Gentleman, 17 lbs of DRAMA.

Features a personality toggle (distinguished vs. unhinged) and a community pet wall where visitors can upload photos of their own pets.

## Architecture

Static site on S3 + CloudFront. Lambda handles community photo uploads via presigned URLs. Infrastructure defined with AWS CDK.

## Deploy

```bash
cd cdk && npm install && npx cdk deploy
```
