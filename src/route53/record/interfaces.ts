import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export interface IRecord {
    setZoneId(zoneId: pulumi.Input<string>): void;
    setTtl(ttl: pulumi.Input<number>): void;
    setName(name: pulumi.Input<string>): void;
    setType(type: pulumi.Input<string>): void;
    setRecords(records: pulumi.Input<pulumi.Input<string>[]>): void;
    setAliases(aliases: IRecordAliases): void;
    setAwsComponent(component: aws.route53.Record): void;
    getZoneId(): pulumi.Input<string>;
    getTtl(): pulumi.Input<number>;
    getName(): pulumi.Input<string>;
    getType(): pulumi.Input<string>;
    getRecords(): pulumi.Input<pulumi.Input<string>[]>;
    getAliases(): IRecordAliases;
    getAwsComponent(): aws.route53.Record;

};

export interface IRecordAliases {
    setName(name: pulumi.Input<string>): void;
    setZoneId(zoneId: pulumi.Input<string>): void;
    setEvaluateTargetHealth(evaluateTargetHealth: pulumi.Input<boolean>): void;
    getName(): pulumi.Input<string>;
    getZoneId(): pulumi.Input<string>;
    getEvaluateTargetHealth(): pulumi.Input<boolean>;
};

export interface IRecordBuilder {
    setZoneId(zoneId: pulumi.Input<string>): IRecordBuilder;
    setTtl(ttl: pulumi.Input<number>): IRecordBuilder;
    setName(name: pulumi.Input<string>): IRecordBuilder;
    setType(type: pulumi.Input<string>): IRecordBuilder;
    setRecords(records: pulumi.Input<pulumi.Input<string>[]>): IRecordBuilder;
    setAliases(aliases: IRecordAliases): IRecordBuilder;
    build(): IRecord;
};

export interface IRecordAliasesBuilder {
    setName(name: pulumi.Input<string>): IRecordAliasesBuilder;
    setZoneId(zoneId: pulumi.Input<string>): IRecordAliasesBuilder;
    setEvaluateTargetHealth(evaluateTargetHealth: pulumi.Input<boolean>): IRecordAliasesBuilder;
    build(): IRecordAliases;
};
