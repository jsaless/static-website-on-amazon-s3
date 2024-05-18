import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { IDistribution, IOrigins, IViewerCertificate, IDefaultCacheBehavior, viewerProtocolPolicyOptions, priceClassOptions } from "./interfaces";

export class Distribution implements IDistribution {
    private pulumiName!: string;

    private origins!: IOrigins;

    private aliases!: pulumi.Input<pulumi.Input<string>[]>;

    private priceClass!: priceClassOptions;

    private defaultRootObject!: pulumi.Input<string>;

    private viewerCertificate!: IViewerCertificate;

    private defaultCacheBehavior!: IDefaultCacheBehavior;

    private awsComponent!: aws.cloudfront.Distribution;

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getPulumiName(): string {
        return this.pulumiName;
    };

    setOrigins(origins: IOrigins): void {
        this.origins = origins;
    };

    getOrigins(): IOrigins {
        return this.origins;
    };

    setAliases(aliases: pulumi.Input<pulumi.Input<string>[]>): void {
        this.aliases = aliases;
    };

    getAliases(): pulumi.Input<pulumi.Input<string>[]> {
        return this.aliases;
    };

    setPriceClass(priceClass: priceClassOptions): void {
        this.priceClass = priceClass;
    };

    getPriceClass(): priceClassOptions {
        return this.priceClass;
    };

    setDefaultCacheBehavior(defaultCacheBehavior: IDefaultCacheBehavior): void {
        this.defaultCacheBehavior = defaultCacheBehavior;
    };

    getDefaultCacheBehavior(): IDefaultCacheBehavior {
        return this.defaultCacheBehavior;
    };

    setViewerCertificate(viewerCertificate: IViewerCertificate): void {
        this.viewerCertificate = viewerCertificate;
    };
    
    getViewerCertificate(): IViewerCertificate {
        return this.viewerCertificate;
    };

    setDefaultRootObject(defaultRootObject: pulumi.Input<string>): void {
        this.defaultRootObject = defaultRootObject;
    };

    getDefaultRootObject(): pulumi.Input<string> {
        return this.defaultRootObject;
    };

    setAwsComponent(component: aws.cloudfront.Distribution): void {
        this.awsComponent = component;
    };

    getAwsComponent(): aws.cloudfront.Distribution {
        return this.awsComponent;
    };
};

export class Origins implements IOrigins {
    private domainName!: pulumi.Input<string>;

    private originId!: pulumi.Input<string>;

    private originAccessControlId!: pulumi.Input<string>;

    setDomainName(domainName: pulumi.Input<string>): void {
        this.domainName = domainName;
    };

    getDomainName(): pulumi.Input<string> {
        return this.domainName;  
    };

    setOriginId(originId: pulumi.Input<string>): void {
        this.originId = originId;
    };

    getOriginId(): pulumi.Input<string> {
        return this.originId;
    };

    setOriginAccessControlId(originAccessControlId: pulumi.Input<string>): void {
        this.originAccessControlId = originAccessControlId;
    };

    getOriginAccessControlId(): pulumi.Input<string> {
        return this.originAccessControlId;
    };
};

export class ViewerCertificate implements IViewerCertificate {
    private acmCertificateArn!: pulumi.Input<string>;

    setAcmCertificateArn(acmCertificateArn: pulumi.Input<string>): void {
        this.acmCertificateArn = acmCertificateArn;
    };

    getAcmCertificateArn(): pulumi.Input<string> {
        return this.acmCertificateArn;
    };
};

export class DefaultCacheBehavior implements IDefaultCacheBehavior {
    private allowedMethods!: pulumi.Input<pulumi.Input<string>[]>;

    private cachedMethods!: pulumi.Input<pulumi.Input<string>[]>;

    private targetOriginId!: pulumi.Input<string>;

    private viewerProtocolPolicy!: viewerProtocolPolicyOptions;

    setAllowedMethods(allowedMethods: pulumi.Input<pulumi.Input<string>[]>): void {
        this.allowedMethods = allowedMethods;
    };

    getAllowedMethods(): pulumi.Input<pulumi.Input<string>[]> {
        return this.allowedMethods;
    };

    setCachedMethods(cachedMethods: pulumi.Input<pulumi.Input<string>[]>): void {
        this.cachedMethods = cachedMethods; 
    };

    getCachedMethods(): pulumi.Input<pulumi.Input<string>[]> {
        return this.cachedMethods;
    };

    setTargetOriginId(targetOriginId: pulumi.Input<string>): void {
        this.targetOriginId = targetOriginId;
    };

    getTargetOriginId(): pulumi.Input<string> {
        return this.targetOriginId;
    };

    setViewerProtocolPolicy(viewerProtocolPolicy: viewerProtocolPolicyOptions): void {
        this.viewerProtocolPolicy = viewerProtocolPolicy;
    };

    getViewerProtocolPolicy(): viewerProtocolPolicyOptions {
        return this.viewerProtocolPolicy;
    };
};  