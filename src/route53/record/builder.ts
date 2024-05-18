import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { Record, RecordAliases} from "./index";
import { IRecordBuilder, IRecordAliasesBuilder, IRecordAliases, IRecord } from "./interfaces";

export class RecordAliasesBuilder implements IRecordAliasesBuilder {
    private recordAliases: RecordAliases = new RecordAliases();

    setName(name: pulumi.Input<string>): IRecordAliasesBuilder {
        this.recordAliases.setName(name);
        return this;
    }
    
    setZoneId(zoneId: pulumi.Input<string>): IRecordAliasesBuilder {
        this.recordAliases.setZoneId(zoneId);
        return this;
    };

    setEvaluateTargetHealth(evaluateTargetHealth: pulumi.Input<boolean>): IRecordAliasesBuilder {
        this.recordAliases.setEvaluateTargetHealth(evaluateTargetHealth);
        return this;
    };

    build(): IRecordAliases {
        return this.recordAliases;
    };
};

export class RecordBuilder implements IRecordBuilder {
    private record: Record = new Record();

    setName(name: pulumi.Input<string>): IRecordBuilder {
        this.record.setName(name);  
        return this;
    }

    setRecords(records: pulumi.Input<pulumi.Input<string>[]>): IRecordBuilder {
        this.record.setRecords(records);
        return this;
    };

    setZoneId(zoneId: pulumi.Input<string>): IRecordBuilder {
        this.record.setZoneId(zoneId);
        return this;
    };

    setType(type: pulumi.Input<string>): IRecordBuilder {
        this.record.setType(type);
        return this;
    };

    setTtl(ttl: pulumi.Input<number>): IRecordBuilder {
        this.record.setTtl(ttl);
        return this;
    };

    setAliases(aliases: IRecordAliases): IRecordBuilder {
        this.record.setAliases(aliases);
        return this;
    };

    private setComponent(component: aws.route53.Record): void {
        this.record.setAwsComponent(component);
    };

    build(): IRecord {
        if(!this.record.getAwsComponent()) {
            const record = new aws.route53.Record("record", {
                zoneId: this.record.getZoneId(),
                ttl: this.record.getTtl(),
                name: this.record.getName(),
                type: this.record.getType(),
                records: this.record.getRecords(),
                aliases: [{
                    name: this.record.getAliases().getName(),
                    zoneId: this.record.getAliases().getZoneId(),
                    evaluateTargetHealth: this.record.getAliases().getEvaluateTargetHealth(),
                }]
            });

            this.setComponent(record);
        };

        return this.record;
    };
};