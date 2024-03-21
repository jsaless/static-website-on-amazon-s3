# Launch a static website on Amazon S3

Deploying your static website on Amazon S3 is a cost-effective solution that is often cheaper than a traditional hosting provider. However we can optimize the availability, security, and reliability of our site using other services to complement this solution.

Here we will create an Amazon S3 bucket to hold a static website files and put Amazon CloudFront distribution to serve the website globally. Amazon Route 53 will manage the resolution of your domain by setting records, and AWS Certificate Manager will provide a valid SSL/TLS certificate for your domain name. The creation of all this will be made with AWS CloudShell/CLI 

### Services used
- AWS CloudShell
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
We can create a bucket with a name of our choice by using the ```s3api``` command to have access of multiples action you can take with S3 Service. In this example we are using the ```create-bucket``` option to create the bucket and ```--bucket``` to set the name.

```aws s3api create-bucket --bucket <BUCKET_NAME>```
## Step 2: Create and configure CloudFront distribution
## Step 3: Upload the web files in the bucket
## Step 4: Buying a domain name in Route 53
## Step 5: Create a Hosted Zone in Route 53 
## Step 6: Set records to our CloudFront domain name in Route 53
## Step 7: Issue a SSL Certificate with AWS Certificate Manager
## Step 8: Validate the SSL Certificate in Route 53
## Step 9: Update CloudFront distribution setting with the domain name and SSL Certificate
