# Launch a static website on Amazon S3

Deploying your static website on Amazon S3 is a cost-effective solution that is often cheaper than a traditional hosting provider. However we can optimize the availability, security, and reliability of our site using other services to complement this solution.

Here we will create an Amazon S3 bucket to hold a static website files and put Amazon CloudFront distribution to serve the website globally. Amazon Route 53 will manage the resolution of your domain by setting records, and AWS Certificate Manager will provide a valid SSL/TLS certificate for your domain name.

### Services used
- Amazon S3
- CloudFront
- Route 53
- AWS Certificate Manager

### Prerequistes
- AWS Account
- Static website made up of HTML, CSS, JavaScript, etc
- Domain Name


>[!TIP]
>If you want, you can follow along with this [AWS Tutorial](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-custom-domain-walkthrough.html) as well

>[!CAUTION]
>Some services will have a charge on you. This case is applied in Route 53 to buy a domain name, to create a hosted zone and depending of the size of your files stored in S3 you may also be charged

## Architecture Diagram
![image](https://github.com/jsaless/static-website-on-amazon-s3/assets/128498851/cb784725-7b1e-4f38-96e0-01663b3bc859)

## Step 1: Buy a domain name in Route 53
If you do not have a domain name you can use **Route 53** to register one. Follow these instructions to access the service and buy your new domain. 
- Login in [AWS Console](https://console.aws.amazon.com/console/home?nc2=h_ct&src=header-signin)
- In the console, click in the *search icon* on the top bar and search by the name of the service, Route 53
- On Route 53 page, in the left hand side, navigate to **Domains > Registered domains**. After that click in **Register domains**
- Search the domain name in the search bar to check the availability of it, if isn't, you can select other suggested options that Route 53 gives to you![BuyingDomainNameInRoute53](https://github.com/jsaless/static-website-on-amazon-s3/assets/128498851/baad309b-770a-4459-9291-4553271ef858)
  - In my case I am following with the ```jsaless.com``` domain name
- After you selected the right domain for you, go in **Proceed to checkout** button, then you can set the duration of the domain name to 1 Year and disable the *auto-renew*. Click in **Next** after that
- Fill all the information required by the Route 53 to buy the domain and go to the next page
- Confirm all your data and the domain name information and now you can **Submit** the request for your domain
  - Will be sent an email to the address specified in the information section to check the reliability of the company/person
- After the request is processed and accepted by AWS your domain name will be available and a hosted zone will be created automatically for it
## Step 2: Create a bucket in S3 to host the website
## Step 2: Create and configure CloudFront distribution
## Step 3: Upload the web files in the bucket
## Step 4: Buying a domain name in Route 53
## Step 5: Create a Hosted Zone in Route 53 
## Step 6: Set records to our CloudFront domain name in Route 53
## Step 7: Issue a SSL Certificate with AWS Certificate Manager
## Step 8: Validate the SSL Certificate in Route 53
## Step 9: Update CloudFront distribution setting with the domain name and SSL Certificate
