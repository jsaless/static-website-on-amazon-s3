import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { ICertificateValidation } from "./interfaces";

export default class CertificateValidation implements ICertificateValidation {
    private certificateArn!: pulumi.Input<string>;

    private pulumiName!: string;

    private awsComponent!: aws.acm.CertificateValidation;

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getPulumiName(): string {
        return this.pulumiName;
    };

    setCertificateValidation(certificateArn: pulumi.Input<string>): void {
        this.certificateArn = certificateArn;
    };

    getCertificateArn(): pulumi.Input<string> {
        return this.certificateArn;
    };

    setAwsComponent(component: aws.acm.CertificateValidation): void {
        this.awsComponent = component;
    };

    getAwsComponent(): aws.acm.CertificateValidation {
        return this.awsComponent;
    };
};