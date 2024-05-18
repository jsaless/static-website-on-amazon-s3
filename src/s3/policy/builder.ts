import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import BucketPolicy from "./index";
import { IBucketPolicy, IBucketPolicyBuilder } from "./interfaces";

export default class BucketPolicyBuilder implements IBucketPolicyBuilder {
    private bucketPolicy: BucketPolicy = new BucketPolicy();

    setPulumiName(name: string): IBucketPolicyBuilder {
        this.bucketPolicy.setPulumiName(name);
        return this;
    };

    setPolicy(policy: pulumi.Input<string | aws.iam.PolicyDocument>): IBucketPolicyBuilder {
        this.bucketPolicy.setPolicy(policy);
        return this;
    };

    setBucket(bucket: pulumi.Input<string>): IBucketPolicyBuilder {
        this.bucketPolicy.setBucket(bucket);
        return this;
    };

    private setComponent(component: aws.s3.BucketPolicy): void {
        this.bucketPolicy.setAwsComponent(component);
    };

    build(): IBucketPolicy {
        if(!this.bucketPolicy.getAwsComponent()) {
            const bucketPolicy = new aws.s3.BucketPolicy(this.bucketPolicy.getPulumiName(), {
                policy: this.bucketPolicy.getPolicy(),
                bucket: this.bucketPolicy.getBucket(),
            });

            this.setComponent(bucketPolicy);
        };

        return this.bucketPolicy;
    };
};