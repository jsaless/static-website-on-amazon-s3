import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi"

import { IZone } from "./interfaces";

export default class Zone implements IZone {
    private name!: pulumi.Input<string>;
    
    private awsComponent!: aws.route53.Zone;

    private pulumiName!: string;

    getPulumiName(): string {
        return this.pulumiName;
    };

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getName(): pulumi.Input<string> {
        return this.name;
    };

    setName(name: pulumi.Input<string> ): void {
        this.name = name;
    };

    getAwsComponent(): aws.route53.Zone {
        return this.awsComponent;
    };

    setAwsComponent(component: aws.route53.Zone): void {
        this.awsComponent = component;
    };
};