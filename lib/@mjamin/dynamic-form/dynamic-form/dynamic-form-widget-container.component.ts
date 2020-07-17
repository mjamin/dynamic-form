import { Component, Input, ComponentRef, ViewChild, ViewContainerRef, DoCheck } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CdkPortalOutlet } from "@angular/cdk/portal";

import { NamedPortalService, NamedPortalServiceContext } from "../core/named-portals";
import { MjDynamicFormSchemaField } from "./dynamic-form-schema";
import { MjDynamicFormWidgetBase } from "./dynamic-form-widget-base";

@Component({
    selector: "df-widget-container",
    template: `<ng-template cdkPortalOutlet></ng-template>`
})
export class DynamicFormWidgetContainerComponent implements DoCheck {
    private _formWidgets: NamedPortalServiceContext;
    private _componentRef: ComponentRef<MjDynamicFormWidgetBase>;
    private _fieldType: string;

    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

    @Input() field: MjDynamicFormSchemaField;
    @Input() form: FormGroup;

    constructor(namedPortalService: NamedPortalService, private _viewContainerRef: ViewContainerRef) {
         this._formWidgets = namedPortalService.for("dynamic-form-widgets");
    }

    ngDoCheck(): void {
        if (this._fieldType !== this.field.type) {
            this.updateComponentPortal();
        }
    }

    private updateComponentPortal(): void {
        if (this.portalOutlet.attached) {
            this.portalOutlet.detach();
        }

        this._componentRef = this._formWidgets.attachComponent(this.field.type, this.portalOutlet, this._viewContainerRef.injector);
        if (this._componentRef == null) {
            return;
        }

        this._componentRef.instance._setFieldAccessor(() => this.field);
        this._componentRef.instance._setForm(this.form);
        this._fieldType = this.field.type;
    }
}
