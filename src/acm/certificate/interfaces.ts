import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface ICertificate {
    setName(name: string): void 
    setDomainName(domainName: pulumi.Input<string>): void;
    setValidationMethod(validationMethod: pulumi.Input<string>): void;
    setAwsComponent(component: aws.acm.Certificate): void;
    getName(): string;
    getDomainName(): pulumi.Input<string>;
    getValidationMethod(): pulumi.Input<string>;
    getAwsComponent(): aws.acm.Certificate;
};

export interface ICertificateBuilder {
    setName(name: string): ICertificateBuilder;
    setDomainName(domainName: pulumi.Input<string>): ICertificateBuilder;
    setValidationMethod(validationMethod: pulumi.Input<string>): ICertificateBuilder;
    build(): ICertificate;
};