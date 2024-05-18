import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { IRegisteredDomain } from "./interfaces";

export default class RegisteredDomain implements IRegisteredDomain {
    private domainName!: pulumi.Input<string>;

    private nameServers!: pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined;

    private awsComponent!: aws.route53domains.RegisteredDomain;

    private pulumiName!: string;

    getPulumiName(): string {
        return this.pulumiName;
    };

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getDomainName(): pulumi.Input<string> {
        return this.domainName;
    };

    setDomainName(domainName: pulumi.Input<string>): void {
        this.domainName = domainName;
    };

    getNameServers(): pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined {
        return this.nameServers;
    };

    setNameServers(nameServers: pulumi.Input<pulumi.Input<aws.types.input.route53domains.RegisteredDomainNameServer>[]> | undefined): void {
        this.nameServers = nameServers;
    };

    getAwsComponent(): aws.route53domains.RegisteredDomain {
        return this.awsComponent;
    };

    setAwsComponent(component: aws.route53domains.RegisteredDomain): void {
        this.awsComponent = component;
    };
};