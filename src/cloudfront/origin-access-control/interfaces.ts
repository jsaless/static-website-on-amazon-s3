import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IOriginAccessControl {
    setPulumiName(name: string): void;
    setName(name: pulumi.Input<string>): void;
    setOriginAccessControlOriginType(originAccessControlOriginType: pulumi.Input<string>): void;
    setSigningBehavior(signingBehavior: pulumi.Input<string>): void;
    setSigningProtocol(signingProtocol: pulumi.Input<string>): void;
    setAwsComponent(component: aws.cloudfront.OriginAccessControl): void;
    getPulumiName(): string;
    getName(): pulumi.Input<string>;
    getOriginAccessControlOriginType(): pulumi.Input<string>;
    getSigningBehavior(): pulumi.Input<string>;
    getSigningProtocol(): pulumi.Input<string>;
    getAwsComponent(): aws.cloudfront.OriginAccessControl;
};

export interface IOriginAccessControlBuilder {
    setPulumiName(name: string): IOriginAccessControlBuilder;
    setName(name: pulumi.Input<string>): IOriginAccessControlBuilder;
    setOriginAccessControlOriginType(originAccessControlOriginType: pulumi.Input<string>): IOriginAccessControlBuilder;
    setSigningBehavior(signingBehavior: pulumi.Input<string>): IOriginAccessControlBuilder;
    setSigningProtocol(signingProtocol: pulumi.Input<string>): IOriginAccessControlBuilder;
    build(): IOriginAccessControl;
};