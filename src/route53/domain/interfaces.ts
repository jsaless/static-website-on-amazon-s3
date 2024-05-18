import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IRegisteredDomain {
    getPulumiName(): string;
    getDomainName(): pulumi.Input<string>;
    getNameServers(): pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined;
    getAwsComponent(): aws.route53domains.RegisteredDomain;
    setPulumiName(name: string): void;
    setDomainName(domainName: pulumi.Input<string>): void;
    setNameServers(nameServers: pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined): void;
    setAwsComponent(component: aws.route53domains.RegisteredDomain): void;
};

export interface IRegisteredDomainBuilder {
    setPulumiName(name: string): IRegisteredDomainBuilder;
    setDomainName(domainName: pulumi.Input<string>): IRegisteredDomainBuilder;
    setNameServers(nameServers: pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined): IRegisteredDomainBuilder;
    build(): IRegisteredDomain;
};