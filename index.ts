// ACM
import CertificateBuilder from "./src/acm/certificate/builder";
import CertificateValidationBuilder from "./src/acm/certificate-validation/builder";

// CloudFront
import { DistributionBuilder, ViewerCertificateBuilder, OriginsBuilder, DefaultCacheBehaviorBuilder } from "./src/cloudfront/distribution/builder";
import OriginAccessControlBuilder from "./src/cloudfront/origin-access-control/builder";

// Route53
import RegisteredDomainBuilder from "./src/route53/domain/builder";
import { RecordAliasesBuilder, RecordBuilder } from "./src/route53/record/builder";
import ZoneBuilder from "./src/route53/zone/builder";

// S3
import BucketBuilder from "./src/s3/bucket/builder";
import BucketObjectBuilder from "./src/s3/object/builder";
import BucketPolicyBuilder from "./src/s3/policy/builder";

// Constants & Names
import * as consts from "./modules/common/constants"
import { interpolate } from "@pulumi/pulumi";

module.exports = () => {
    const hostedZone = new ZoneBuilder()
        .setPulumiName(consts.hostedZoneName)
        .setName(consts.bucketDomainName)
        .build();

    new RegisteredDomainBuilder()
        .setPulumiName(consts.domainName)
        .setDomainName(consts.bucketDomainName)
        .setNameServers(
            hostedZone.getAwsComponent().nameServers.apply(servers => {
                return servers.map(server => ({ name: server }));
            })
        )
        .build();

    const acmCertificate = new CertificateBuilder()
        .setPulumiName(consts.certificateName)
        .setDomainName(consts.bucketDomainName)
        .setValidationMethod("DNS")
        .build();

    new RecordBuilder()
        .setPulumiName(consts.validationRecordsName)
        .setZoneId(hostedZone.getAwsComponent().id)
        .setTtl(300)
        .setName(acmCertificate.getAwsComponent().domainValidationOptions[0].resourceRecordName)
        .setType(acmCertificate.getAwsComponent().domainValidationOptions[0].resourceRecordType)
        .setRecords([acmCertificate.getAwsComponent().domainValidationOptions[0].resourceRecordValue])
        .build();

    const validateCertificate = new CertificateValidationBuilder()
        .setPulumiName(consts.certificateValidationName)
        .setCertificateValidation(acmCertificate.getAwsComponent().arn)
        .build();

    const bucket = new BucketBuilder()
        .setPulumiName(consts.bucketName)
        .setBucket(consts.bucketDomainName)
        .build();

    new BucketObjectBuilder()
        .setPulumiName(consts.bucketObjectName)
        .setKey(consts.localFileName)
        .setContentType("text/html")
        .setBucket(bucket.getAwsComponent().id)
        .setSource(consts.localFilePath)
        .build();

    const originAccessControl = new OriginAccessControlBuilder()
        .setPulumiName(consts.originAccessControlName)
        .setName(bucket.getAwsComponent().bucketRegionalDomainName)
        .setOriginAccessControlOriginType("s3")
        .setSigningBehavior("always")
        .setSigningProtocol("sigv4")
        .build();

    // CloudFront
    const origins = new OriginsBuilder()
        .setDomainName(bucket.getAwsComponent().bucketRegionalDomainName)
        .setOriginId(bucket.getAwsComponent().id)
        .setOriginAccessControlId(originAccessControl.getAwsComponent().id)
        .build();

    const viewerCertificate = new ViewerCertificateBuilder()
        .setAcmCertificateArn(acmCertificate.getAwsComponent().arn)
        .build();

    const defaultCacheBehavior = new DefaultCacheBehaviorBuilder()
        .setAllowedMethods(["GET", "HEAD"])
        .setCachedMethods(["GET", "HEAD"])
        .setTargetOriginId(bucket.getAwsComponent().id)
        .setViewerProtocolPolicy("redirect-to-https")
        .build();

    const distribution = new DistributionBuilder()
        .setPulumiName(consts.distributionName)
        .setOrigins(origins)
        .setAliases([consts.bucketDomainName])
        .setPriceClass("PriceClass_100")
        .setDefaultRootObject(consts.localFileName)
        .setViewerCertificate(viewerCertificate)
        .setDefaultCacheBehavior(defaultCacheBehavior)
        .setDependsOn(validateCertificate.getAwsComponent())
        .build();

    new BucketPolicyBuilder()
        .setPulumiName(consts.bucketPolicyName)
        .setBucket(bucket.getAwsComponent().bucket)
        .setPolicy(consts.bucketPolicy(distribution.getAwsComponent().id))
        .build();

    const recordAliases = new RecordAliasesBuilder()
        .setName(distribution.getAwsComponent().domainName)
        .setZoneId(distribution.getAwsComponent().hostedZoneId)
        .setEvaluateTargetHealth(false)
        .build();

    new RecordBuilder()
        .setPulumiName(consts.distributionRecordsName)
        .setZoneId(hostedZone.getAwsComponent().id)
        .setAliases(recordAliases)
        .setName(consts.bucketDomainName)
        .setType("A")
        .build();

    return {
        cloudfrontUrl: interpolate`https://${distribution.getAwsComponent().aliases}`
    };
};