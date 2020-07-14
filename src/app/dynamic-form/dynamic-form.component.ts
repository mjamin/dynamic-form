import { Subject, Observable, ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Component, Input, Output, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy, ViewChild, Self, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, FormGroupDirective } from "@angular/forms";

import { withSubscriptionSink } from "../shared/mixins/subscription-sink";
import { DynamicFormController } from "./dynamic-form-controller";
import { DynamicFormRef } from "./dynamic-form-ref";
import { DynamicFormEvent } from "./dynamic-form-event";
import { DynamicFormSchema, DynamicFormSchemaTab, DynamicFormSchemaField } from "./dynamic-form-schema";

export function FORM_GROUP_DIRECTIVE_FACTORY(formComponent: DynamicFormComponent): FormGroupDirective {
    return formComponent.formGroupDirective;
}

@Component({
    selector: "app-dynamic-form",
    templateUrl: "./dynamic-form.component.html",
    styleUrls: ["./dynamic-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: FormGroupDirective, useFactory: FORM_GROUP_DIRECTIVE_FACTORY, deps: [[new Self(), DynamicFormComponent]] }
    ]
})
export class DynamicFormComponent extends withSubscriptionSink() implements DynamicFormRef, OnDestroy {
    private _schemaSubject = new ReplaySubject<DynamicFormSchema>(1);
    private _formEventSubject = new Subject<DynamicFormEvent>();
    private _controller: DynamicFormController;
    private _selectedTabId: string;

    @ViewChild(FormGroupDirective, { static: true }) formGroupDirective: FormGroupDirective;

    @Output() formEvents = new EventEmitter<DynamicFormEvent>();

    formGroup = new FormGroup({});

    constructor(private _cdr: ChangeDetectorRef) {
        super();

        this.subscribe(this.schema$.pipe(tap(schema => { this.updateFormGroup(schema); })));
    }

    @Input()
    get controller(): DynamicFormController { return this._controller; }
    set controller(value: DynamicFormController) { this.setController(value); }

    get schema$(): Observable<DynamicFormSchema> { return this._schemaSubject.asObservable(); }

    markForCheck(): void {
        this._cdr.markForCheck();
    }

    setSchema(schema: DynamicFormSchema, emitEvent?: boolean): void {
        this._schemaSubject.next(schema);

        if (emitEvent === true) {
            this._formEventSubject.next(new DynamicFormEvent("update-schema"));
        }

        this.markForCheck();
    }

    setValues(values: {[key: string]: any}, emitEvent?: boolean): void {
        this.formGroup.setValue(values);

        if (emitEvent === true) {
            this._formEventSubject.next(new DynamicFormEvent("update-values"));
        }

        this.markForCheck();
    }

    selectTab(tab: DynamicFormSchemaTab): void {
        if (this._selectedTabId === tab.id) {
            return;
        }

        this._selectedTabId = tab.id;
        this.markForCheck();
    }

    isSelectedTab(schema: DynamicFormSchema, tab: DynamicFormSchemaTab, index: number): boolean {
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
        this._formEventSubject.complete();
        this._schemaSubject.complete();
        this._controller.detach();
    }

    private setController(controller: DynamicFormController): void {
        this._controller = controller;
        this._controller.attach(this);
    }

    private updateFormGroup(schema: DynamicFormSchema): void {
        const fields = (schema.tabs || [])
            .flatMap(t => t.fieldsets || [])
            .flatMap(fs => fs.fields || [])
            .reduce((o, field) => { o[field.id] = field; return o; }, {}) as {[key: string]: DynamicFormSchemaField};

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

    private addFormControl(id: string, field: DynamicFormSchemaField): void {
        this.formGroup.addControl(id, new FormControl("", this.getValidators(field)));
    }

    private updateFormControl(id: string, field: DynamicFormSchemaField): void {
        const control = this.formGroup.get(id);
        control.setValidators(this.getValidators(field));

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

    private getValidators(field: DynamicFormSchemaField): ValidatorFn[] {
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
