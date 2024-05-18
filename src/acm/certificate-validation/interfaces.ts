import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface ICertificateValidation {
    getPulumiName(): string;
    getCertificateArn(): pulumi.Input<string>;
    getAwsComponent(): aws.acm.CertificateValidation;
    setPulumiName(name: string): void;
    setCertificateValidation(certificateArn: pulumi.Input<string>): void;
    setAwsComponent(component: aws.acm.CertificateValidation): void;
};

export interface ICertificateValidationBuilder {
    setPulumiName(name: string): ICertificateValidationBuilder;
    setCertificateValidation(certificateArn: pulumi.Input<string>): ICertificateValidationBuilder;
    build(): ICertificateValidation;
};