import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { ICertificate, ICertificateBuilder } from "./interfaces";
import { Certificate } from "./index";

export default class CertificateBuilder implements ICertificateBuilder {
    private certificate: Certificate = new Certificate();

    setPulumiName(name: string): ICertificateBuilder {
        this.certificate.setPulumiName(name);
        return this;
    }

    setName(name: pulumi.Input<string>): ICertificateBuilder {
        this.certificate.setName(name);
        return this;
    }

    setDomainName(domainName: pulumi.Input<string>): ICertificateBuilder {
        this.certificate.setDomainName(domainName);
        return this;
    };

    setValidationMethod(validationMethod: pulumi.Input<string>): ICertificateBuilder {
        this.certificate.setValidationMethod(validationMethod);
        return this;
    };

    private setComponent(component: aws.acm.Certificate): void {
        this.certificate.setAwsComponent(component);
    };

    build(): ICertificate {
        if(!this.certificate.getAwsComponent()) {
            const certificate = new aws.acm.Certificate(this.certificate.getPulumiName(), {
                domainName: this.certificate.getDomainName(),
                validationMethod: this.certificate.getValidationMethod(),
            });

            this.setComponent(certificate);
        };

        return this.certificate;
    };
};