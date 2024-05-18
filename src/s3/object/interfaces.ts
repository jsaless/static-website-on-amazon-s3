import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IBucketObject {
    setPulumiName(name: string): void;
    setBucket(bucket: pulumi.Input<string>): void;
    setKey(key: pulumi.Input<string>): void;
    setContentType(contentType: pulumi.Input<string>): void;
    setSource(path: string): void;
    setAwsComponent(component: aws.s3.BucketObjectv2): void;
    getPulumiName(): string;
    getBucket(): pulumi.Input<string>;
    getKey(): pulumi.Input<string>;
    getContentType(): pulumi.Input<string>;
    getSource(): string;
    getAwsComponent(): aws.s3.BucketObjectv2;
};

export interface IBucketObjectBuilder {
    setPulumiName(name: string): IBucketObjectBuilder;
    setBucket(bucket: pulumi.Input<string>): IBucketObjectBuilder;
    setKey(key: pulumi.Input<string>): IBucketObjectBuilder;
    setContentType(contentType: pulumi.Input<string>): IBucketObjectBuilder;
    setSource(path: string): IBucketObjectBuilder;
    build(): IBucketObject;
};