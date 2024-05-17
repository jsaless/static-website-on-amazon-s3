import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IRegisteredDomain {
    getDomainName(): string;
    getNameServers(): pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined;
    getAwsComponent(): aws.route53domains.RegisteredDomain;
    setDomainName(domainName: string): void;
    setNameServers(nameServers: pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined): void;
    setAwsComponent(component: aws.route53domains.RegisteredDomain): void;
};

export interface IRegisteredDomainBuilder {
    setDomainName(domainName: string): this;
    setNameServers(nameServers: pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined): this;
    build(): IRegisteredDomain;
};