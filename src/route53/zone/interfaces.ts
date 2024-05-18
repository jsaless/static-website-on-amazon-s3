import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IZone {
    getPulumiName(): string
    getName(): pulumi.Input<string>;
    getAwsComponent(): aws.route53.Zone;
    setPulumiName(name: string): void;
    setName(name: pulumi.Input<string>): void;
    setAwsComponent(component: aws.route53.Zone): void;
};

export interface IZoneBuilder {
    setPulumiName(name: string): IZoneBuilder
    setName(name: pulumi.Input<string> ): IZoneBuilder;
    build(): IZone;
};