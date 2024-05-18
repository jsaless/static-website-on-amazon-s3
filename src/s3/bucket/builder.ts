import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { Bucket } from "./index";
import { IBucketBuilder } from "./interfaces";

export default class BucketBuilder implements IBucketBuilder {
    private bucket: Bucket = new Bucket();

    setPulumiName(name: string): IBucketBuilder {
        this.bucket.setPulumiName(name);
        return this;
    };

    setBucket(bucket: pulumi.Input<string>): IBucketBuilder {
        this.bucket.setBucket(bucket);
        return this;
    };

    private setComponent(component: aws.s3.BucketV2): void {
        this.bucket.setAwsComponent(component);
    };

    build(): Bucket {
        if(!this.bucket.getAwsComponent()) {
            const bucketResource = new aws.s3.BucketV2(this.bucket.getPulumiName(), {
                bucket: this.bucket.getBucket(),
            });

            this.setComponent(bucketResource);
        };

        return this.bucket;
    };
};