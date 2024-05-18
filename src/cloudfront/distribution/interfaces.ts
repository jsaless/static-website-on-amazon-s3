import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IDistribution {
    setPulumiName(name: string): void;
    setOrigins(origins: IOrigins): void;
    setAliases(aliases: pulumi.Input<pulumi.Input<string>[]>): void;
    setPriceClass(priceClass: priceClassOptions): void;
    setDefaultRootObject(defaultRootObject: pulumi.Input<string>): void;
    setViewerCertificate(viewerCertificate: IViewerCertificate): void;
    setDefaultCacheBehavior(defaultCacheBehavior: IDefaultCacheBehavior): void;
    setAwsComponent(component: aws.cloudfront.Distribution): void;
    getPulumiName(): string;
    getOrigins(): IOrigins;
    getAliases(): pulumi.Input<pulumi.Input<string>[]>;
    getPriceClass(): priceClassOptions;
    getDefaultRootObject(): pulumi.Input<string>;
    getViewerCertificate(): IViewerCertificate;
    getDefaultCacheBehavior(): IDefaultCacheBehavior;
    getAwsComponent(): aws.cloudfront.Distribution;
};

export interface IOrigins {
    setDomainName(domainName:  pulumi.Input<string>): void;
    setOriginId(originId: pulumi.Input<string>): void;
    setOriginAccessControlId(originAccessControlId: pulumi.Input<string>): void;
    getDomainName(): pulumi.Input<string>;
    getOriginId(): pulumi.Input<string>;
    getOriginAccessControlId(): pulumi.Input<string>;
};

export interface IViewerCertificate {
    setAcmCertificateArn(acmCertificateArn: pulumi.Input<string>): void;
    getAcmCertificateArn(): pulumi.Input<string>;
};

export interface IDefaultCacheBehavior {
    setAllowedMethods(allowedMethods: pulumi.Input<pulumi.Input<string>[]>): void;
    setCachedMethods(cachedMethods: pulumi.Input<pulumi.Input<string>[]>): void;
    setTargetOriginId(targetOriginId: pulumi.Input<string>): void;
    setViewerProtocolPolicy(viewerProtocolPolicy: viewerProtocolPolicyOptions): void;
    getAllowedMethods(): pulumi.Input<pulumi.Input<string>[]>;
    getCachedMethods(): pulumi.Input<pulumi.Input<string>[]>;
    getTargetOriginId(): pulumi.Input<string>;
    getViewerProtocolPolicy(): viewerProtocolPolicyOptions;
};

export interface IDistributionBuilder {
    setPulumiName(name: string): IDistributionBuilder;
    setOrigins(origins: IOrigins): IDistributionBuilder;
    setAliases(aliases: pulumi.Input<pulumi.Input<string>[]>): IDistributionBuilder;
    setPriceClass(priceClass: priceClassOptions): IDistributionBuilder;
    setDefaultRootObject(defaultRootObject: pulumi.Input<string>): IDistributionBuilder;
    setViewerCertificate(viewerCertificate: IViewerCertificate): IDistributionBuilder;
    setDefaultCacheBehavior(defaultCacheBehavior: IDefaultCacheBehavior): IDistributionBuilder;
    setDependsOn(resource: pulumi.Input<pulumi.Resource> | pulumi.Input<pulumi.Input<pulumi.Resource>[]>): IDistributionBuilder
    build(): IDistribution;
}; 

export interface IOriginsBuilder {
    setDomainName(domainName:  pulumi.Input<string>): IOriginsBuilder;
    setOriginId(originId: pulumi.Input<string>): IOriginsBuilder;
    setOriginAccessControlId(originAccessControlId: pulumi.Input<string>): IOriginsBuilder;
    build(): IOrigins;
}; 
export interface IViewerCertificateBuilder {
    setAcmCertificateArn(acmCertificateArn: pulumi.Input<string>): IViewerCertificateBuilder;
    build(): IViewerCertificate;
}; 

export interface IDefaultCacheBehaviorBuilder {
    setAllowedMethods(allowedMethods: pulumi.Input<pulumi.Input<string>[]>): IDefaultCacheBehaviorBuilder;
    setCachedMethods(cachedMethods: pulumi.Input<pulumi.Input<string>[]>): IDefaultCacheBehaviorBuilder;
    setTargetOriginId(targetOriginId: pulumi.Input<string>): IDefaultCacheBehaviorBuilder;
    setViewerProtocolPolicy(viewerProtocolPolicy: viewerProtocolPolicyOptions): IDefaultCacheBehaviorBuilder;
    build(): IDefaultCacheBehavior;
}; 

export type viewerProtocolPolicyOptions = pulumi.Input<"redirect-to-https"> | pulumi.Input<"https-only"> | pulumi.Input<"allow-all">;
export type priceClassOptions = pulumi.Input<"PriceClass_100"> | pulumi.Input<"PriceClass_All"> | pulumi.Input<"PriceClass_200">;