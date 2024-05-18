import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IBucket {
    setPulumiName(name: string): void;
    setBucket(bucket: pulumi.Input<string>): void;
    setAwsComponent(component: aws.s3.BucketV2): void;
    getPulumiName(): string;
    getBucket(): pulumi.Input<string>;
    getAwsComponent(): aws.s3.BucketV2;
};

export interface IBucketBuilder {
    setPulumiName(name: string): IBucketBuilder;
    setBucket(bucket: pulumi.Input<string>): IBucketBuilder;
    build(): IBucket;
};