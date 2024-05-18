import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { ICertificate } from "./interfaces";

export default class Certificate implements ICertificate {
    private name!: pulumi.Input<string>;

    private domainName!: pulumi.Input<string>;
    
    private validationMethod!: pulumi.Input<string>;

    private awsComponent!: aws.acm.Certificate;

    private pulumiName!: string;

    getPulumiName(): string {
        return this.pulumiName;
    };

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getDomainName(): pulumi.Input<string> {
        return this.domainName;
    };

    setDomainName(domainName: pulumi.Input<string>): void {
        this.domainName = domainName;
    };

    getName(): pulumi.Input<string> {
        return this.name;
    };

    setName(name: pulumi.Input<string>): void {
        this.name = name;
    };

    getValidationMethod(): pulumi.Input<string> {
        return this.validationMethod;
    };

    setValidationMethod(validationMethod: pulumi.Input<string>): void {
        this.validationMethod = validationMethod;
    };

    getAwsComponent(): aws.acm.Certificate {
        return this.awsComponent;
    };

    setAwsComponent(component: aws.acm.Certificate): void {
        this.awsComponent = component;
    };
};