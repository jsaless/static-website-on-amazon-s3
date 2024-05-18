import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IBucketPolicy {
    setPulumiName(name: string): void;
    setPolicy(policy: pulumi.Input<string | aws.iam.PolicyDocument>): void;
    setBucket(bucket: pulumi.Input<string>): void;
    setAwsComponent(component: aws.s3.BucketPolicy): void;
    getPulumiName(): string;
    getPolicy(): pulumi.Input<string | aws.iam.PolicyDocument>;
    getBucket(): pulumi.Input<string>;
    getAwsComponent(): aws.s3.BucketPolicy;
};

export interface IBucketPolicyBuilder {
    setPulumiName(name: string): IBucketPolicyBuilder;
    setPolicy(policy: pulumi.Input<string | aws.iam.PolicyDocument>): IBucketPolicyBuilder;
    setBucket(bucket: pulumi.Input<string>): IBucketPolicyBuilder;
    build(): IBucketPolicy;
};