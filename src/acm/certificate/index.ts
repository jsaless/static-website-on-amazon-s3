import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { ICertificate } from "./interfaces";

export default class Certificate implements ICertificate {
    private name!: string;

    private domainName!: pulumi.Input<string>;
    
    private validationMethod!: pulumi.Input<string>;

    private awsComponent!: aws.acm.Certificate;

    getDomainName(): pulumi.Input<string> {
        return this.domainName;
    };

    setDomainName(domainName: pulumi.Input<string>): void {
        this.domainName = domainName;
    };

    getName(): string {
        return this.name;
    };

    setName(name: string): void {
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