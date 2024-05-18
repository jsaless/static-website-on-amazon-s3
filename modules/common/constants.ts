import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

// Stack Configs
export const projectName = pulumi.getProject();
export const environment = pulumi.getStack();

// AWS Configs
export const awsAccountId = pulumi.output(aws.getCallerIdentity({}).then((caller) => caller.accountId));

export const policyVersion = "2012-10-17";

// Project Configs
export const bucketDomainName = config.require("bucket-domain-name");

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