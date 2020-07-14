import { Component, Input, ComponentRef, ViewChild, ViewContainerRef, DoCheck, OnChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CdkPortalOutlet } from "@angular/cdk/portal";

import { NamedPortalService, NamedPortalServiceContext } from "../shared/common/named-portals";
import { DynamicFormSchemaField } from "./dynamic-form-schema";
import { DynamicFormWidgetBase } from "./dynamic-form-widget-base";

@Component({
    selector: "dynamic-form-widget-container",
    templateUrl: "./dynamic-form-widget-container.component.html"
})
export class DynamicFormWidgetContainerComponent implements DoCheck {
    private _formWidgets: NamedPortalServiceContext;
    private _componentRef: ComponentRef<DynamicFormWidgetBase>;
    private _fieldType: string;

    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

    @Input() field: DynamicFormSchemaField;
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
