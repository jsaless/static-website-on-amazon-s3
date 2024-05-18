import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import Zone from "./index";
import { IZoneBuilder } from "./interfaces";

export default class ZoneBuilder implements IZoneBuilder {
    private zone: Zone = new Zone(); 

    setPulumiName(name: string): IZoneBuilder {
        this.zone.setPulumiName(name);
        return this;
    };

    setName(name: pulumi.Input<string> ): IZoneBuilder {
        this.zone.setName(name);
        return this;
    };

    private setComponent(component: aws.route53.Zone): void {
        this.zone.setAwsComponent(component);
    };

    build(): Zone {
        if (!this.zone.getAwsComponent()) {
            const zone = new aws.route53.Zone(this.zone.getPulumiName(), {
                name: this.zone.getName(),
            });

            this.setComponent(zone);
        };
    
        return this.zone;
    };
};