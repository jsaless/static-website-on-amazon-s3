import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { Distribution, Origins, ViewerCertificate, DefaultCacheBehavior } from "./index";
import { IDistributionBuilder, IOriginsBuilder, IViewerCertificateBuilder, IDefaultCacheBehaviorBuilder, viewerProtocolPolicyOptions, priceClassOptions, IOrigins, IViewerCertificate, IDefaultCacheBehavior, IDistribution } from "./interfaces";

export class DistributionBuilder implements IDistributionBuilder {
    private distribution: Distribution = new Distribution();

    private dependentsResources!: pulumi.Input<pulumi.Resource> | pulumi.Input<pulumi.Input<pulumi.Resource>[]>

    setPulumiName(name: string): IDistributionBuilder {
        this.distribution.setPulumiName(name);
        return this;
    };

    setOrigins(origins: IOrigins): IDistributionBuilder {
        this.distribution.setOrigins(origins);
        return this;  
    };

    setAliases(aliases: pulumi.Input<pulumi.Input<string>[]>): IDistributionBuilder {
        this.distribution.setAliases(aliases);
        return this;
    };

    setDefaultRootObject(defaultRootObject: pulumi.Input<string>): IDistributionBuilder {
        this.distribution.setDefaultRootObject(defaultRootObject);
        return this;
    };

    setDefaultCacheBehavior(defaultCacheBehavior: IDefaultCacheBehavior): IDistributionBuilder {
        this.distribution.setDefaultCacheBehavior(defaultCacheBehavior);
        return this;
    };

    setViewerCertificate(viewerCertificate: IViewerCertificate): IDistributionBuilder {
        this.distribution.setViewerCertificate(viewerCertificate);
        return this;
    };

    setPriceClass(priceClass: priceClassOptions): IDistributionBuilder {
        this.distribution.setPriceClass(priceClass);
        return this;
    };

    setDependsOn(resource: pulumi.Input<pulumi.Resource> | pulumi.Input<pulumi.Input<pulumi.Resource>[]>): IDistributionBuilder {
        this.dependentsResources = resource;
        return this;
    };

    private setComponent(component: aws.cloudfront.Distribution): void {
        this.distribution.setAwsComponent(component);
    };

    build(): IDistribution {
        if(!this.distribution.getAwsComponent()) {
            const distribution = new aws.cloudfront.Distribution(this.distribution.getPulumiName(), {
                origins: [{
                    domainName: this.distribution.getOrigins().getDomainName(),
                    originId: this.distribution.getOrigins().getOriginId(),
                    originAccessControlId: this.distribution.getOrigins().getOriginAccessControlId(),
                }],
                aliases: this.distribution.getAliases(),
                priceClass: this.distribution.getPriceClass(),
                defaultRootObject: this.distribution.getDefaultRootObject(),
                enabled: true,
                restrictions: {
                    geoRestriction: {
                        restrictionType: "none",
                    },
                },
                viewerCertificate: {
                    acmCertificateArn: this.distribution.getViewerCertificate().getAcmCertificateArn(),
                    sslSupportMethod: "sni-only",
                    minimumProtocolVersion: "TLSv1.2_2021",
                },
                defaultCacheBehavior: {
                    allowedMethods: this.distribution.getDefaultCacheBehavior().getAllowedMethods(),
                    cachedMethods: this.distribution.getDefaultCacheBehavior().getCachedMethods(),
                    targetOriginId: this.distribution.getDefaultCacheBehavior().getTargetOriginId(),
                    viewerProtocolPolicy: this.distribution.getDefaultCacheBehavior().getViewerProtocolPolicy(),
                    cachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6",
                },
            },
            {
                dependsOn: this.dependentsResources
            }
        );

            this.setComponent(distribution);
        };

        return this.distribution;
    };
};

export class OriginsBuilder implements IOriginsBuilder {
    private origins: Origins = new Origins();

    setDomainName(domainName: pulumi.Input<string>): IOriginsBuilder {
        this.origins.setDomainName(domainName);
        return this;
    };

    setOriginAccessControlId(originAccessControlId: pulumi.Input<string>): IOriginsBuilder {
        this.origins.setOriginAccessControlId(originAccessControlId);
        return this;
    };

    setOriginId(originId: pulumi.Input<string>): IOriginsBuilder {
        this.origins.setOriginId(originId);
        return this;
    };

    build(): IOrigins {
        return this.origins;
    };
};

export class ViewerCertificateBuilder implements IViewerCertificateBuilder {
    private viewerCertificate: ViewerCertificate = new ViewerCertificate();

    setAcmCertificateArn(acmCertificateArn: pulumi.Input<string>): IViewerCertificateBuilder {
        this.viewerCertificate.setAcmCertificateArn(acmCertificateArn);
        return this;
    };

    build(): IViewerCertificate {
        return this.viewerCertificate;
    };
};

export class DefaultCacheBehaviorBuilder implements IDefaultCacheBehaviorBuilder {
    private defaultCacheBehavior: DefaultCacheBehavior = new DefaultCacheBehavior();

    setAllowedMethods(allowedMethods: pulumi.Input<pulumi.Input<string>[]>): IDefaultCacheBehaviorBuilder {
        this.defaultCacheBehavior.setAllowedMethods(allowedMethods);
        return this;
    };

    setCachedMethods(cachedMethods: pulumi.Input<pulumi.Input<string>[]>): IDefaultCacheBehaviorBuilder {
        this.defaultCacheBehavior.setCachedMethods(cachedMethods);
        return this;
    };
    
    setTargetOriginId(targetOriginId: pulumi.Input<string>): IDefaultCacheBehaviorBuilder {
        this.defaultCacheBehavior.setTargetOriginId(targetOriginId);
        return this;
    }

    setViewerProtocolPolicy(viewerProtocolPolicy: viewerProtocolPolicyOptions): IDefaultCacheBehaviorBuilder {
        this.defaultCacheBehavior.setViewerProtocolPolicy(viewerProtocolPolicy);
        return this;
    };

    build(): IDefaultCacheBehavior {
        return this.defaultCacheBehavior;
    };
};