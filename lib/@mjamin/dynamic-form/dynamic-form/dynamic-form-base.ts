import { Subject, Observable, ReplaySubject } from "rxjs";
import { tap, distinctUntilChanged } from "rxjs/operators";
import { Input, Output, ChangeDetectorRef, OnDestroy, ViewChild, EventEmitter, Directive } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, FormGroupDirective } from "@angular/forms";

import { withSubscriptionSink } from "@mjamin/common";

import { MjDynamicFormController } from "./dynamic-form-controller";
import { DynamicFormRef } from "./dynamic-form-ref";
import { DynamicFormEvent, FormValueChangedEvent, FormSchemaChangedEvent, FormStatusChangedEvent } from "./dynamic-form-event";
import { MjDynamicFormSchema, MjDynamicFormSchemaTab, MjDynamicFormSchemaField } from "./dynamic-form-schema";

@Directive()
export abstract class MjDynamicFormBase extends withSubscriptionSink() implements DynamicFormRef, OnDestroy {
    private _schemaSubject = new ReplaySubject<MjDynamicFormSchema>(1);
    private _controller: MjDynamicFormController;
    private _selectedTabId: string;

    @ViewChild(FormGroupDirective, { static: true }) formGroupDirective: FormGroupDirective;

    @Output() formEvents = new EventEmitter<DynamicFormEvent>();

    formGroup = new FormGroup({});

    constructor(private _cdr: ChangeDetectorRef) {
        super();

        this.subscribe(this.schema$.pipe(
            tap(schema => {
                this.updateFormGroup(schema);
            })
        ));

        this.subscribe(this.formGroup.statusChanges.pipe(
            distinctUntilChanged(),
            tap(() => {
                this.formEvents.emit(new FormStatusChangedEvent(this.formGroup));
            })
        ));
    }

    @Input()
    get controller(): MjDynamicFormController { return this._controller; }
    set controller(value: MjDynamicFormController) { this.setController(value); }

    get schema$(): Observable<MjDynamicFormSchema> { return this._schemaSubject.asObservable(); }

    markForCheck(): void {
        this._cdr.markForCheck();
    }

    setSchema(schema: MjDynamicFormSchema, emitEvent?: boolean): void {
        this._schemaSubject.next(schema);

        if (emitEvent === true) {
            this.formEvents.emit(new FormSchemaChangedEvent(this.formGroup, schema));
        }

        this.markForCheck();
    }

    setValues(values: {[key: string]: any}, emitEvent?: boolean): void {
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
        this._schemaSubject.complete();
        this._controller.detach();
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

        for (const fieldId of fieldIds.filter(id => !this.formGroup.get(id))) {
            this.addFormControl(fieldId, fields[fieldId]);
        }

        for (const fieldId of fieldIds.filter(id => this.formGroup.get(id))) {
            this.updateFormControl(fieldId, fields[fieldId]);
        }

        for (const controlId of Object.keys(this.formGroup.controls).filter(id => !fields[id])) {
            this.removeFormControl(controlId);
        }
    }

    private addFormControl(id: string, field: MjDynamicFormSchemaField): void {
        this.formGroup.addControl(id, new FormControl(field.defaultValue, this.getValidators(field)));
    }

    private updateFormControl(id: string, field: MjDynamicFormSchemaField): void {
        const control = this.formGroup.get(id);
        control.setValidators(this.getValidators(field));

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
