/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-selector */
import { CdkPortalOutlet, PortalModule } from "@angular/cdk/portal";
import { ChangeDetectionStrategy, Component, ComponentRef, DoCheck, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from "@angular/forms";

import { NamedPortalService, NamedPortalServiceContext } from "../core/named-portals";
import { MjDynamicFormSchemaField } from "./dynamic-form-schema";
import { MjDynamicFormWidgetBase } from "./dynamic-form-widget-base";

/**
 * A container for dynamic form widgets.
 */
@Component({
    selector: "df-widget-container",
    template: "<ng-template cdkPortalOutlet></ng-template>",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "[style.flex-basis.%]": "field.width || field.space",
        "[style.margin-right.%]": "totalWidth"
    },
    standalone: true,
    imports: [PortalModule]
})
export class MjDynamicFormWidgetContainerComponent implements DoCheck {
    private _formWidgets: NamedPortalServiceContext<MjDynamicFormWidgetBase>;
    private _componentRef: ComponentRef<MjDynamicFormWidgetBase>;
    private _fieldType: string;
    private _fieldLabel: string;

    /**
     * The portal outlet.
     */
    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

    /**
     * The field to render.
     */
    @Input() field: MjDynamicFormSchemaField;

    /**
     * The form.
     */
    @Input() form: UntypedFormGroup;

    /**
     * Creates an instance of MjDynamicFormWidgetContainerComponent.
     * 
     * @param namedPortalService The named portal service.
     * @param _viewContainerRef The view container reference.
     */
    constructor(namedPortalService: NamedPortalService, private _viewContainerRef: ViewContainerRef) {
        this._formWidgets = namedPortalService.for("dynamic-form-widgets");
    }

    /**
     * The raw validator of the widget.
     */
    get rawValidator(): ValidatorFn {
        return this._componentRef && this._componentRef.instance.formControlName
            ? this._componentRef.instance.formControlName.validator
            : null;
    }

    /**
     * The form control of the widget.
     */
    get control(): UntypedFormControl {
        return this._componentRef && this._componentRef.instance.control;
    }

    /**
     * The total width of the widget.
     */
    get totalWidth(): number {
        return this.field.space
            ? this.field.space - this.field.width
            : null;
    }

    /**
     * Marks the widget for check.
     */
    markForCheck(): void {
        this._componentRef.changeDetectorRef.markForCheck();
    }

    /** @inheritdoc */
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
        if (this._componentRef === null) {
            return;
        }

        this._componentRef.location.nativeElement.classList.add("mj-dynamic-form-widget");
        this._componentRef.instance._setFieldAccessor(() => this.field);
        this._componentRef.instance._setForm(this.form);
        this._fieldType = this.field.type;
    }
}
