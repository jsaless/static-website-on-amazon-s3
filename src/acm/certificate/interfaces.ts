import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface ICertificate {
    setPulumiName(name: string): void;
    setName(name: pulumi.Input<string>): void 
    setDomainName(domainName: pulumi.Input<string>): void;
    setValidationMethod(validationMethod: pulumi.Input<string>): void;
    setAwsComponent(component: aws.acm.Certificate): void;
    getPulumiName(): string;
    getName(): pulumi.Input<string>;
    getDomainName(): pulumi.Input<string>;
    getValidationMethod(): pulumi.Input<string>;
    getAwsComponent(): aws.acm.Certificate;
};

export interface ICertificateBuilder {
    setPulumiName(name: string): ICertificateBuilder;
    setName(name: pulumi.Input<string>): ICertificateBuilder;
    setDomainName(domainName: pulumi.Input<string>): ICertificateBuilder;
    setValidationMethod(validationMethod: pulumi.Input<string>): ICertificateBuilder;
    build(): ICertificate;
};