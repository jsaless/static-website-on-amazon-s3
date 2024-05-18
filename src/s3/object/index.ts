import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { IBucketObject } from "./interfaces";

export class BucketObject implements IBucketObject {
    private pulumiName!: string;

    private bucket!: pulumi.Input<string>;

    private key!: pulumi.Input<string>;

    private contentType!: pulumi.Input<string>;

    private source!: string;

    private awsComponent!: aws.s3.BucketObjectv2;

    setPulumiName(name: string): void {
        this.pulumiName;
    };

    getPulumiName(): string {
        return this.pulumiName;
    };

    setContentType(contentType: pulumi.Input<string>): void {
        this.contentType = contentType;
    };

    getContentType(): pulumi.Input<string> {
        return this.contentType;
    };

    setKey(key: pulumi.Input<string>): void {
        this.key = key;
    };

    getKey(): pulumi.Input<string> {
        return this.key;
    };

    setSource(path: string): void {
        this.source = path;
    };

    getSource(): string {
        return this.source;
    };

    setBucket(bucket: pulumi.Input<string>): void {
        this.bucket = bucket;
    };

    getBucket(): pulumi.Input<string> {
        return this.bucket;
    };

    setAwsComponent(component: aws.s3.BucketObjectv2): void {
        this.awsComponent = component;
    };

    getAwsComponent(): aws.s3.BucketObjectv2 {
        return this.awsComponent;
    };
};