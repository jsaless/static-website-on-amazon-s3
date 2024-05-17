import * as aws from "@pulumi/aws";

import { IZone } from "./interfaces";

export default class Zone implements IZone {
    private name!: string;
    
    private awsComponent!: aws.route53.Zone;

    getName(): string {
        return this.name;
    };

    setName(name: string ): void {
        this.name = name;
    };

    getAwsComponent(): aws.route53.Zone {
        return this.awsComponent;
    };

    setAwsComponent(component: aws.route53.Zone): void {
        this.awsComponent = component;
    };
};