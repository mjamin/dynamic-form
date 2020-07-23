import { Component, Input, ComponentRef, ViewChild, ViewContainerRef, DoCheck, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, ValidatorFn, FormControl } from "@angular/forms";
import { CdkPortalOutlet } from "@angular/cdk/portal";

import { NamedPortalService, NamedPortalServiceContext } from "../core/named-portals";
import { MjDynamicFormSchemaField } from "./dynamic-form-schema";
import { MjDynamicFormWidgetBase } from "./dynamic-form-widget-base";

@Component({
    selector: "df-widget-container",
    template: `<ng-template cdkPortalOutlet></ng-template>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MjDynamicFormWidgetContainerComponent implements DoCheck {
    private _formWidgets: NamedPortalServiceContext;
    private _componentRef: ComponentRef<MjDynamicFormWidgetBase>;
    private _fieldType: string;
    private _fieldLabel: string;

    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

    @Input() field: MjDynamicFormSchemaField;
    @Input() form: FormGroup;

    constructor(namedPortalService: NamedPortalService, private _viewContainerRef: ViewContainerRef) {
         this._formWidgets = namedPortalService.for("dynamic-form-widgets");
    }

    get rawValidator(): ValidatorFn {
        return this._componentRef && this._componentRef.instance.formControlName
            ? this._componentRef.instance.formControlName.validator
            : null;
    }

    get control(): FormControl {
        return this._componentRef && this._componentRef.instance.control;
    }

    markForCheck(): void {
        this._componentRef.changeDetectorRef.markForCheck();
    }

    ngDoCheck(): void {
        if (this._fieldType !== this.field.type) {
            this.updateComponentPortal();
        }

        if (this._fieldLabel !== this.field.label) {
            this._fieldLabel = this.field.label;

            if (this._componentRef && this._componentRef.location) {
                if (this._componentRef.instance && !this._componentRef.instance.labelVisible) {
                    this._componentRef.location.nativeElement.classList.add("mj-dynamic-form-widget-no-label");
                } else {
                    this._componentRef.location.nativeElement.classList.remove("mj-dynamic-form-widget-no-label");
                }
            }
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

        this._componentRef.location.nativeElement.classList.add("mj-dynamic-form-widget");
        this._componentRef.instance._setFieldAccessor(() => this.field);
        this._componentRef.instance._setForm(this.form);
        this._fieldType = this.field.type;
    }
}
