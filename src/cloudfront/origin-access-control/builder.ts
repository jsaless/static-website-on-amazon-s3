import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import { OriginAccessControl } from "./index";
import { IOriginAccessControl, IOriginAccessControlBuilder } from "./interfaces";

export default class OriginAccessControlBuilder implements IOriginAccessControlBuilder {
    private originAccessControl: OriginAccessControl = new OriginAccessControl();

    setPulumiName(name: string): IOriginAccessControlBuilder {
        this.originAccessControl.setPulumiName(name);
        return this;
    };

    setName(name: pulumi.Input<string>): IOriginAccessControlBuilder {
        this.originAccessControl.setName(name);
        return this;
    };

    setOriginAccessControlOriginType(originAccessControlOriginType: pulumi.Input<string>): IOriginAccessControlBuilder {
        this.originAccessControl.setOriginAccessControlOriginType(originAccessControlOriginType);
        return this;
    };

    setSigningBehavior(signingBehavior: pulumi.Input<string>): IOriginAccessControlBuilder {
        this.originAccessControl.setSigningBehavior(signingBehavior);
        return this;
    };

    setSigningProtocol(signingProtocol: pulumi.Input<string>): IOriginAccessControlBuilder {
        this.originAccessControl.setSigningProtocol(signingProtocol);
        return this;
    };

    private setComponent(component: aws.cloudfront.OriginAccessControl): void {
        this.originAccessControl.setAwsComponent(component);
    };

    build(): IOriginAccessControl {
        if(!this.originAccessControl.getAwsComponent()) {
            const originAccessControl = new aws.cloudfront.OriginAccessControl(this.originAccessControl.getPulumiName(), {
                name: this.originAccessControl.getName(),
                originAccessControlOriginType: this.originAccessControl.getOriginAccessControlOriginType(),
                signingBehavior: this.originAccessControl.getSigningBehavior(),
                signingProtocol: this.originAccessControl.getSigningProtocol(),
            });

            this.setComponent(originAccessControl);
        };

        return this.originAccessControl;
    };
};