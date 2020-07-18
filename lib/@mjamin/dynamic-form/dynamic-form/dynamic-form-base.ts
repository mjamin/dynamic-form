import { tap, distinctUntilChanged, startWith } from "rxjs/operators";
import { Input, Output, ChangeDetectorRef, OnDestroy, ViewChild, EventEmitter, Directive, ViewChildren, QueryList, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, FormGroupDirective, FormControlName } from "@angular/forms";

import { withSubscriptionSink } from "@mjamin/common";

import { MjDynamicFormController } from "./dynamic-form-controller";
import { DynamicFormRef } from "./dynamic-form-ref";
import { DynamicFormEvent, FormValueChangedEvent, FormSchemaChangedEvent, FormStatusChangedEvent } from "./dynamic-form-event";
import { MjDynamicFormSchema, MjDynamicFormSchemaTab, MjDynamicFormSchemaField } from "./dynamic-form-schema";
import { DynamicFormWidgetContainerComponent } from "./dynamic-form-widget-container.component";

@Directive()
export abstract class MjDynamicFormBase extends withSubscriptionSink() implements DynamicFormRef, OnDestroy, AfterViewInit {
    private _controller: MjDynamicFormController;
    private _schema: MjDynamicFormSchema;
    private _selectedTabId: string;
    private _rawValidators: {[key: string]: ValidatorFn } = {};

    @ViewChild(FormGroupDirective, { static: true }) formGroupDirective: FormGroupDirective;

    @ViewChildren(DynamicFormWidgetContainerComponent) widgetContainers = new QueryList<DynamicFormWidgetContainerComponent>();

    @Output() formEvents = new EventEmitter<DynamicFormEvent>();

    formGroup = new FormGroup({});

    constructor(private _cdr: ChangeDetectorRef) {
        super();

        this.subscribe(this.formGroup.statusChanges.pipe(
            distinctUntilChanged(),
            tap(() => {
                this.formEvents.emit(new FormStatusChangedEvent(this.formGroup));
            })
        ));

        this.subscribe(this.formGroup.valueChanges.pipe(
            distinctUntilChanged(),
            tap(() => {
                this.formEvents.emit(new FormValueChangedEvent(this.formGroup));
            })
        ));
    }

    @Input()
    get controller(): MjDynamicFormController { return this._controller; }
    set controller(value: MjDynamicFormController) { this.setController(value); }

    @Input()
    get schema(): MjDynamicFormSchema { return this._schema; }
    set schema(value: MjDynamicFormSchema) { this.setSchema(value); }

    markForCheck(): void {
        this._cdr.markForCheck();
    }

    setSchema(schema: MjDynamicFormSchema, emitEvent: boolean = true): void {
        this._schema = schema;

        this.updateFormGroup(schema);

        if (emitEvent === true) {
            this.formEvents.emit(new FormSchemaChangedEvent(this.formGroup, schema));
        }

        this.markForCheck();
    }

    setValues(values: {[key: string]: any}, emitEvent: boolean = true): void {
        this.formGroup.setValue(values);

        if (emitEvent === true) {
            this.formEvents.emit(new FormValueChangedEvent(this.formGroup));
        }

        this.markForCheck();
    }

    selectTab(tab: MjDynamicFormSchemaTab): void {
        if (this._selectedTabId === tab.id) {
            return;
        }

        this._selectedTabId = tab.id;
        this.markForCheck();
    }

    isSelectedTab(schema: MjDynamicFormSchema, tab: MjDynamicFormSchemaTab, index: number): boolean {
        if (this._selectedTabId === undefined && index === 0) {
            return true;
        }

        if (this._selectedTabId) {
            if (this._selectedTabId === tab.id) {
                return true;
            }

            if (schema.tabs.findIndex(t => t.id === this._selectedTabId) === -1 && index === 0) {
                return true;
            }
        }

        return false;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._controller.detach();
    }

    ngAfterViewInit(): void {
        this.subscribe(this.widgetContainers.changes.pipe(
            startWith(this.widgetContainers),
            tap((widgetContainers: QueryList<DynamicFormWidgetContainerComponent>) => {
                for (const c of widgetContainers) {
                    this._rawValidators[c.field.id] = c.rawValidator;
                }
            })
        ));
    }

    trackByIdFn(_: number, item: any): any {
        return item.id || item;
    }

    trackByIdAndTypeFn(_: number, item: any): any {
        if (item.id && item.type) {
            return `${item.id}-${item.type}`;
        }

        return item.id || item;
    }

    private setController(controller: MjDynamicFormController): void {
        this._controller = controller;
        this._controller.attach(this);
    }

    private updateFormGroup(schema: MjDynamicFormSchema): void {
        const fields = (schema.tabs || [])
            .flatMap(t => t.fieldsets || [])
            .flatMap(fs => fs.fields || [])
            .reduce((o, field) => { o[field.id] = field; return o; }, {}) as {[key: string]: MjDynamicFormSchemaField};

        const fieldIds = Object.keys(fields);
        const controlIds = Object.keys(this.formGroup.controls);

        for (const fieldId of fieldIds.filter(id => !controlIds.includes(id))) {
            this.addFormControl(fieldId, fields[fieldId]);
        }

        for (const fieldId of fieldIds.filter(id => controlIds.includes(id))) {
            this.updateFormControl(fieldId, fields[fieldId]);
        }

        for (const controlId of controlIds.filter(id => !fields[id])) {
            this.removeFormControl(controlId);
        }
    }

    private addFormControl(id: string, field: MjDynamicFormSchemaField): void {
        const control = new FormControl(field.defaultValue, this.getValidators(field));
        this.formGroup.addControl(id, control);
    }

    private updateFormControl(id: string, field: MjDynamicFormSchemaField): void {
        const control = this.formGroup.get(id);

        // I feel like there should be a setTimeout necessary here, but it doesn't seem to be so...
        control.setValidators([...this.getValidators(field), this._rawValidators[field.id]]);

        if (control.pristine && typeof field.defaultValue !== "undefined") {
            control.setValue(field.defaultValue);
        }

        if (field.readonly && control.enabled) {
            control.disable();
        } else if (!field.readonly && control.disabled) {
            control.enable();
        }

        control.updateValueAndValidity();
    }

    private removeFormControl(id: string): void {
        this.formGroup.removeControl(id);
    }

    private getValidators(field: MjDynamicFormSchemaField): ValidatorFn[] {
        if (!field.validators) {
            return [];
        }

        const validators = [];

        for (const name of Object.keys(field.validators)) {
            switch (name) {
                case "required":
                    if (field.validators.required === true) { validators.push(Validators.required); }
                    break;
                case "requiredTrue":
                    if (field.validators.requiredTrue === true) { validators.push(Validators.requiredTrue); }
                    break;
                case "minlength":
                    validators.push(Validators.minLength((field.validators[name] as any).length || 0));
                    break;
                case "maxlength":
                    validators.push(Validators.maxLength((field.validators[name] as any).length || 0));
                    break;
                // ...
            }
        }

        return validators;
    }
}
