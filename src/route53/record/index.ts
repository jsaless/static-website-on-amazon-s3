import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { IRecord, IRecordAliases } from "./interfaces";

export class Record implements IRecord {
    private zoneId!: pulumi.Input<string>;

    private ttl!: pulumi.Input<number>;

    private name!: pulumi.Input<string>;

    private type!: pulumi.Input<string>;

    private records!: pulumi.Input<pulumi.Input<string>[]>;

    private aliases!: IRecordAliases;

    private awsComponent!: aws.route53.Record;

    private pulumiName!: string;

    setPulumiName(name: string): void {
        this.pulumiName = name;
    };

    getPulumiName(): string {
        return this.pulumiName;
    };

    setName(name: pulumi.Input<string>): void {
        this.name = name;
    };

    getName(): pulumi.Input<string> {
        return this.name;
    };

    setRecords(records: pulumi.Input<pulumi.Input<string>[]>): void {
        this.records = records;
    };

    getRecords(): pulumi.Input<pulumi.Input<string>[]> {
        return this.records;
    };

    setTtl(ttl: pulumi.Input<number>): void {
        this.ttl = ttl;
    };

    getTtl(): pulumi.Input<number> {
        return this.ttl;
    };

    setZoneId(zoneId: pulumi.Input<string>): void {
        this.zoneId = zoneId;
    };

    getZoneId(): pulumi.Input<string> {
        return this.zoneId;
    }

    setType(type: pulumi.Input<string>): void {
        this.type = type;
    };

    getType(): pulumi.Input<string> {
        return this.type;
    };

    setAliases(aliases: IRecordAliases): void {
        this.aliases = aliases;
    };

    getAliases(): IRecordAliases {
        return this.aliases;
    };

    setAwsComponent(component: aws.route53.Record): void {
        this.awsComponent = component;
    };

    getAwsComponent(): aws.route53.Record {
        return this.awsComponent;
    };
};

export class RecordAliases implements IRecordAliases {
    private name!: pulumi.Input<string>;
    
    private zoneId!: pulumi.Input<string>;

    private evaluateTargetHealth!: pulumi.Input<boolean>;

    setName(name: pulumi.Input<string>): void {
        this.name = name;
    };

    getName(): pulumi.Input<string> {
        return this.name;
    };

    setZoneId(zoneId: pulumi.Input<string>): void {
        this.zoneId = zoneId;
    };

    getZoneId(): pulumi.Input<string> {
        return this.zoneId;
    };

    setEvaluateTargetHealth(evaluateTargetHealth: pulumi.Input<boolean>): void {
        this.evaluateTargetHealth = evaluateTargetHealth;
    };

    getEvaluateTargetHealth(): pulumi.Input<boolean> {
        return this.evaluateTargetHealth;
    };
};

