import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { RegisteredDomain } from "./index";
import { IRegisteredDomainBuilder } from "./interfaces";

export default class RegisteredDomainBuilder implements IRegisteredDomainBuilder {
    private registeredDomain: RegisteredDomain = new RegisteredDomain();

    setPulumiName(name: string): IRegisteredDomainBuilder {
        this.registeredDomain.setPulumiName(name);
        return this;
    }

    setDomainName(domainName: pulumi.Input<string>): IRegisteredDomainBuilder {
        this.registeredDomain.setDomainName(domainName);
        return this;
    };

    setNameServers(nameServers: pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined): IRegisteredDomainBuilder {
        this.registeredDomain.setNameServers(nameServers);
        return this;
    };

    private setComponent(component: aws.route53domains.RegisteredDomain): void {
        this.registeredDomain.setAwsComponent(component);
    };

    build(): RegisteredDomain {
        if(!this.registeredDomain.getAwsComponent()) {
            const domainNameServers = new aws.route53domains.RegisteredDomain(this.registeredDomain.getPulumiName(), {
                domainName: this.registeredDomain.getDomainName(),
                nameServers: this.registeredDomain.getNameServers(),
            });

            this.setComponent(domainNameServers);
        };

        return this.registeredDomain;
    };
};