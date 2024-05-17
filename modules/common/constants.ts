import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

// Stack Configs
export const projectName = pulumi.getProject();
export const environment = pulumi.getStack();

// AWS Configs
export const awsAccountId = pulumi.output(aws.getCallerIdentity({}).then((caller) => caller.accountId));
export const awsRegion = aws.getRegionOutput({}).name;
export const policyVersion = "2012-10-17";

// Prjoect Configs
export const nameServers = config.requireObject<string[]>("nameServers")