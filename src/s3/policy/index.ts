import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { IBucketPolicy } from "./interfaces";

export default class BucketPolicy implements IBucketPolicy {
    private pulumiName!: string;

    private policy!: pulumi.Input<string | aws.iam.PolicyDocument>;

    private bucket!: pulumi.Input<string>;

    private awsComponent!: aws.s3.BucketPolicy;

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getPulumiName(): string {
        return this.pulumiName;
    };

    setPolicy(policy: pulumi.Input<string | aws.iam.PolicyDocument>): void {
        this.policy = policy;
    };

    getPolicy(): pulumi.Input<string | aws.iam.PolicyDocument> {
        return this.policy;
    };

    setBucket(bucket: pulumi.Input<string>): void {
        this.bucket = bucket;
    };

    getBucket(): pulumi.Input<string> {
        return this.bucket;
    };

    setAwsComponent(component: aws.s3.BucketPolicy): void {
        this.awsComponent = component;
    };

    getAwsComponent(): aws.s3.BucketPolicy {
        return this.awsComponent;
    };
};