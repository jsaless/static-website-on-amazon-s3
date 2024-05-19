import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import n from "@soufantech/pulumi-naming";

const config = new pulumi.Config();

// AWS Configs
export const awsAccountId = pulumi.output(aws.getCallerIdentity({}).then((caller) => caller.accountId));

export const policyVersion = "2012-10-17";

// Project Configs
export const bucketDomainName = config.require("bucket-domain-name");
export const localFilePath = config.require("local-file-path");
export const localFileName = config.require("local-file-name");

// Resource Names
export const hostedZoneName = n("zone");
export const domainName = n("domain");
export const certificateName = n("certificate");
export const validationRecordsName = n("validation-records");
export const certificateValidationName = n("certificate-validation");
export const bucketName = n("bucket");
export const bucketObjectName = n("object");
export const originAccessControlName = n("origin-access-control");
export const bucketPolicyName = n("policy");
export const distributionName = n("distribution");
export const distributionRecordsName = n("distribution-records");

// Policies
export const bucketPolicy = (distribution: pulumi.Input<string>) => aws.iam.getPolicyDocumentOutput({
    version: policyVersion,
    statements: [
        {
            sid: "AllowCloudFrontServicePrincipal",
            effect: "Allow",
            principals: [
                {
                    type: "Service",
                    identifiers: ["cloudfront.amazonaws.com"]
                }
            ],
            actions: ["s3:GetObject"],
            resources: [pulumi.interpolate`arn:aws:s3:::${bucketDomainName}/*`],
            conditions: [
                {
                    test: "StringEquals",
                    variable: "AWS:SourceArn",
                    values: [pulumi.interpolate`arn:aws:cloudfront::${awsAccountId}:distribution/${distribution}`]
                }
            ]
        }
    ]
}).json;