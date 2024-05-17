import * as aws from "@pulumi/aws";

import Zone from "./index";
import { IZoneBuilder } from "./interfaces";

export default class ZoneBuilder implements IZoneBuilder {
    private zone: Zone = new Zone(); 

    setName(name: string ): this {
        this.zone.setName(name);
        return this;
    };

    private setComponent(component: aws.route53.Zone): this {
        this.zone.setAwsComponent(component);
        return this;
    };

    build(): Zone {
        if (!this.zone.getAwsComponent()) {
            const zone = new aws.route53.Zone(this.zone.getName(), {
                name: this.zone.getName(),
            });

            this.setComponent(zone);
        };
    
        return this.zone;
    };
};