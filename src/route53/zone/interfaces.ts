import * as aws from "@pulumi/aws";

export interface IZone {
    getName(): string ;
    getAwsComponent(): aws.route53.Zone;
    setName(name: string ): void;
    setAwsComponent(component: aws.route53.Zone): void;
};

export interface IZoneBuilder {
    setName(name: string ): this;
    build(): IZone;
};