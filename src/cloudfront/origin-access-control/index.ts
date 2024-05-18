import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { IOriginAccessControl } from "./interfaces";

export class OriginAccessControl implements IOriginAccessControl {
    private pulumiName!: string;

    private name!: pulumi.Input<string>;

    private originAccessControlType!: pulumi.Input<string>;

    private signingBehavior!: pulumi.Input<string>;

    private signingProtocol!: pulumi.Input<string>;

    private awsComponent!: aws.cloudfront.OriginAccessControl;

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getPulumiName(): string {
        return this.pulumiName;
    };

    setName(name: pulumi.Input<string>): void {
        this.name = name;
    };

    getName(): pulumi.Input<string> {
        return this.name;
    };

    setOriginAccessControlOriginType(originAccessControlOriginType: pulumi.Input<string>): void {
        this.originAccessControlType = originAccessControlOriginType;
    };

    getOriginAccessControlOriginType(): pulumi.Input<string> {
        return this.originAccessControlType;
    };

    setSigningBehavior(signingBehavior: pulumi.Input<string>): void {
        this.signingBehavior = signingBehavior;
    };

    getSigningBehavior(): pulumi.Input<string> {
        return this.signingBehavior;
    };

    setSigningProtocol(signingProtocol: pulumi.Input<string>): void {
        this.signingProtocol = signingProtocol;
    };

    getSigningProtocol(): pulumi.Input<string> {
        return this.signingProtocol;
    };

    setAwsComponent(component: aws.cloudfront.OriginAccessControl): void {
        this.awsComponent = component;
    };

    getAwsComponent(): aws.cloudfront.OriginAccessControl {
        return this.awsComponent;      
    };
};