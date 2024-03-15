# Launch a static website on Amazon S3

Deploying your static website on Amazon S3 is a cost-effective solution that is often cheaper than a traditional hosting provider.

Here we will create an Amazon S3 bucket to hold a static website files and put Amazon CloudFront distribution to serve the website globally. Amazon Route 53 will manage the resolution of your domain by setting records(optional), and AWS Certificate Manager will provide a valid SSL/TLS certificate for your domain name(optional).

### Services used
- Amazon S3
- CloudFront
- Route53
- AWS Certificate Manager

### Prerequistes
- AWS Account
- Static website made up of HTML, CSS, JavaScript, etc
- Domain Name


>[!TIP]
>If you want, you can follow along with this [AWS Tutorial](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html) as well


## Architecture Diagram
![image](https://github.com/jsaless/static-website-on-amazon-s3/assets/128498851/cb784725-7b1e-4f38-96e0-01663b3bc859)


## Step 1: Create the bucket for your static website
## Step 2: Create and configure CloudFront distribution
## Step 3: Upload the web files in the bucket
## Step 4: Buying a domain name in Route 53
## Step 5: Create a Hosted Zone in Route 53 
## Step 6: Set records to our CloudFront domain name in Route 53
## Step 7: Issue a SSL Certificate with AWS Certificate Manager
## Step 8: Validate the SSL Certificate in Route 53
## Step 9: Update CloudFront distribution setting with the domain name and SSL Certificate
