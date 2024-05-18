import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import CertificateValidation from "./index";
import { ICertificateValidationBuilder } from "./interfaces";

export default class CertificateValidationBuilder implements ICertificateValidationBuilder {
    private certificateValidation: CertificateValidation = new CertificateValidation();

    setPulumiName(name: string): ICertificateValidationBuilder {
        this.certificateValidation.setPulumiName(name);
        return this;
    };

    setCertificateValidation(certificateArn: pulumi.Input<string>): ICertificateValidationBuilder {
        this.certificateValidation.setCertificateValidation(certificateArn);
        return this;
    };

    private setComponent(component: aws.acm.CertificateValidation): void {
        this.certificateValidation.setAwsComponent(component);
    };

    build(): CertificateValidation {
        if(!this.certificateValidation.getAwsComponent()) {
            const validateCertificate = new aws.acm.CertificateValidation(this.certificateValidation.getPulumiName(), {
                certificateArn: this.certificateValidation.getCertificateArn(),
            });

            this.setComponent(validateCertificate);
        };

        return this.certificateValidation;
    };
};