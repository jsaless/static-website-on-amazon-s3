import CertificateBuilder from "./src/acm/certificate/builder";
import CertificateValidationBuilder from "./src/acm/certificate-validation/builder";

import { DistributionBuilder, ViewerCertificateBuilder, OriginsBuilder, DefaultCacheBehaviorBuilder } from "./src/cloudfront/distribution/builder";
import OriginAccessControlBuilder from "./src/cloudfront/origin-access-control/builder";

import RegisteredDomainBuilder from "./src/route53/domain/builder";
import { RecordAliasesBuilder, RecordBuilder} from "./src/route53/record/builder";
import ZoneBuilder from "./src/route53/zone/builder";

import BucketBuilder from "./src/s3/bucket/builder";
import BucketObjectBuilder from "./src/s3/object/builder";
import BucketPolicyBuilder from "./src/s3/policy/builder";
import { bucketDomainName, bucketPolicy } from "./modules/common/constants"

module.exports = async() => {
    const hostedZone = new ZoneBuilder()
        .setPulumiName("public-zone")
        .setName(bucketDomainName)
        .build();
    
    new RegisteredDomainBuilder()
        .setPulumiName("my-domain")
        .setDomainName(bucketDomainName)
        .setNameServers(
            hostedZone.getAwsComponent().nameServers.apply(servers => {
                return servers.map(server => ({name: server}));
            })
        )
        .build();
    
    const acmCertificate = new CertificateBuilder()
        .setPulumiName("acm-certificate")
        .setDomainName(bucketDomainName)
        .setValidationMethod("DNS")
        .build();
    
    new RecordBuilder()
        .setPulumiName("validation-records")
        .setZoneId(hostedZone.getAwsComponent().id)
        .setTtl(300)
        .setName(acmCertificate.getAwsComponent().domainValidationOptions[0].resourceRecordName)
        .setType(acmCertificate.getAwsComponent().domainValidationOptions[0].resourceRecordType)
        .setRecords([acmCertificate.getAwsComponent().domainValidationOptions[0].resourceRecordValue])
        .build();
    
    const validateCertificate = new CertificateValidationBuilder()
        .setPulumiName("certificate-validation")
        .setCertificateValidation(acmCertificate.getAwsComponent().arn)
        .build();
    
    const bucket = new BucketBuilder()
        .setPulumiName("bucket")
        .setBucket(bucketDomainName)
        .build();
    
    new BucketObjectBuilder()
        .setPulumiName("bucket-object")
        .setKey("index.html")
        .setContentType("text/html")
        .setBucket(bucket.getAwsComponent().id)
        .setSource("./modules/components/index.html")
        .build();
    
    const originAccessControl = new OriginAccessControlBuilder()
        .setPulumiName("origin-access-control")
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
        .setPulumiName("distribution")
        .setOrigins(origins)
        .setAliases([bucketDomainName])
        .setPriceClass("PriceClass_100")
        .setDefaultRootObject("index.html")
        .setViewerCertificate(viewerCertificate)
        .setDefaultCacheBehavior(defaultCacheBehavior)
        .setDependsOn(validateCertificate.getAwsComponent())
        .build();
    
    new BucketPolicyBuilder()
        .setPulumiName("bucket-policy")
        .setBucket(bucket.getAwsComponent().bucket)
        .setPolicy(bucketPolicy(distribution.getAwsComponent().id))
        .build();
    
    const recordAliases = new RecordAliasesBuilder()
        .setName(distribution.getAwsComponent().domainName)
        .setZoneId(distribution.getAwsComponent().hostedZoneId)
        .setEvaluateTargetHealth(false)
        .build();
    
    new RecordBuilder()
        .setPulumiName("records-to-distribution")
        .setZoneId(hostedZone.getAwsComponent().id)
        .setAliases(recordAliases)
        .setName(bucketDomainName)
        .setType("A")
        .build();
};