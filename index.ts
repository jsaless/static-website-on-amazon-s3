import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const route53hostedZone = new aws.route53.Zone("public-zone-route53", {
    name: "jsaless.com",
});

const domainNameServers = new aws.route53domains.RegisteredDomain("my-domain-route53", {
    domainName: "jsaless.com",
    nameServers: route53hostedZone.nameServers.apply(servers => {
        return servers.map(server => ({ name: server }));
    })
})

const exampleCertificate = new aws.acm.Certificate("acm-certificate", {
    domainName: "jsaless.com",
    validationMethod: "DNS",
});

const validationData = {
    name: () => exampleCertificate.domainValidationOptions[0]["resourceRecordName"],
    type: () => exampleCertificate.domainValidationOptions[0]["resourceRecordType"],
    record: () => exampleCertificate.domainValidationOptions[0]["resourceRecordValue"]
}

const validationRecord = new aws.route53.Record("validation-records-route53", {
    zoneId: route53hostedZone.id,
    ttl: 300,
    name: validationData.name(),
    type: validationData.type(),
    records: [validationData.record()]
});

const validateCertificate = new aws.acm.CertificateValidation("acm-certificate-validation", {
    certificateArn: exampleCertificate.arn
})

const s3Bucket = new aws.s3.BucketV2("bucket-s3", {
    bucket: "jsaless.com",
});

const s3BucketContent = new aws.s3.BucketObjectv2("object-bucket-s3", {
    key: "index.html",
    contentType: "text/html",
    bucket: s3Bucket.id,
    source: new pulumi.asset.FileAsset("./src/index.html")
})

const cloudFrontOriginAccessOrigin = new aws.cloudfront.OriginAccessControl("origin-access-control-cloudfront", {
    name: s3Bucket.bucketRegionalDomainName,
    originAccessControlOriginType: "s3",
    signingBehavior: "always",
    signingProtocol: "sigv4"
})

const cloudFrontDistribution = new aws.cloudfront.Distribution("distribution-cloudfront", {
    origins: [{
        domainName: s3Bucket.bucketRegionalDomainName,
        originId: s3Bucket.id,
        originAccessControlId: cloudFrontOriginAccessOrigin.id
    }],
    aliases: [
        "jsaless.com"
    ],
    priceClass: "PriceClass_100",
    defaultRootObject: "index.html",
    enabled: true,
    restrictions: {
        geoRestriction: {
            restrictionType: "none"
        }
    },
    viewerCertificate: {
        acmCertificateArn: exampleCertificate.arn,
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1.2_2021"
    },
    defaultCacheBehavior: {
        allowedMethods: [
            "GET",
            "HEAD",
        ],
        cachedMethods: [
            "GET",
            "HEAD"
        ],
        targetOriginId: s3Bucket.id,
        viewerProtocolPolicy: "redirect-to-https",
        cachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6"
    }
}, {
    dependsOn: validateCertificate
});

const s3BucketPolicy = new aws.s3.BucketPolicy("policy-bucket-s3", {
    policy: aws.iam.getPolicyDocumentOutput({
        version: "2012-10-17",
        statements: [
            {
                sid: "AllowCloudFrontServicePrincipal",
                effect: "Allow",
                principals: [{
                    type: "Service",
                    identifiers: ["cloudfront.amazonaws.com"]
                }],
                actions: ["s3:GetObject"],
                resources: [pulumi.interpolate`${s3Bucket.arn}/*`],
                conditions: [{
                    test: "StringEquals",
                    variable: "AWS:SourceArn",
                    values: [cloudFrontDistribution.arn]
                }]
            }
        ]
    }).json,
    bucket: s3Bucket.bucket
});

const route53RecordToCloudFront = new aws.route53.Record("cloudfront-records-route53", {
    zoneId: route53hostedZone.id,
    aliases: [{
        name: cloudFrontDistribution.domainName,
        zoneId: cloudFrontDistribution.hostedZoneId,
        evaluateTargetHealth: false,
    }],
    name: "jsaless.com",
    type: aws.route53.RecordType.A,
})


export const cloudFrontUrl = pulumi.interpolate`https://${cloudFrontDistribution.aliases}`