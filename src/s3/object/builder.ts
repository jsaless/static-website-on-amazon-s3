import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { BucketObject } from "./index";
import { IBucketObjectBuilder } from "./interfaces";

export default class BucketObjectBuilder implements IBucketObjectBuilder {
    private object: BucketObject = new BucketObject();

    setPulumiName(name: string): IBucketObjectBuilder {
        this.object.setPulumiName(name);
        return this;
    };

    setBucket(bucket: pulumi.Input<string>): IBucketObjectBuilder {
        this.object.setBucket(bucket);
        return this;
    };

    setContentType(contentType: pulumi.Input<string>): IBucketObjectBuilder {
        this.object.setContentType(contentType);
        return this;
    };

    setSource(path: string): IBucketObjectBuilder {
        this.object.setSource(path);
        return this;
    };

    setKey(key: pulumi.Input<string>): IBucketObjectBuilder {
        this.object.setKey(key);
        return this;
    };

    private setComponent(component: aws.s3.BucketObjectv2): void {
        this.object.setAwsComponent(component);
    };

    build(): BucketObject {
        if(!this.object.getAwsComponent()) {
            const object = new aws.s3.BucketObjectv2(this.object.getPulumiName(), {
                bucket: this.object.getBucket(),
                key: this.object.getKey(),
                source: new pulumi.asset.FileAsset(this.object.getSource()),
                contentType: this.object.getContentType(),
            });

            this.setComponent(object);
        };

        return this.object;
    };
};