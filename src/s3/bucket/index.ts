import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { IBucket } from "./interfaces";

export class Bucket implements IBucket {
    private pulumiName!: string;

    private bucket!: pulumi.Input<string>;

    private awsComponent!: aws.s3.BucketV2;

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getPulumiName(): string {
        return this.pulumiName;
    };

    setBucket(bucket: pulumi.Input<string>): void {
        this.bucket = bucket;
    };

    getBucket(): pulumi.Input<string> {
        return this.bucket;
    };

    setAwsComponent(component: aws.s3.BucketV2): void {
        this.awsComponent = component;
    };

    getAwsComponent(): aws.s3.BucketV2 {
        return this.awsComponent;
    };
};