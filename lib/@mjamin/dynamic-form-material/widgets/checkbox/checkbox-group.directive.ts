import { startWith, tap, map } from "rxjs/operators";
import { QueryList, ContentChildren, Directive, Input, ChangeDetectorRef, AfterContentInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { MatCheckbox } from "@angular/material/checkbox";

import { withSubscriptionSink } from "@mjamin/common";

@Directive({
    selector: "df-widget-checkbox-group",
    exportAs: "dfCheckboxGroup",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxGroupDirective, multi: true }
    ]
})
export class CheckboxGroupDirective extends withSubscriptionSink() implements ControlValueAccessor, AfterContentInit {
    private _value: any[] = null;
    private _disabled: boolean;
    private _onChange: (value: any) => any = () => {};
    private _onTouched: () => any = () => {};

    @ContentChildren(MatCheckbox, { descendants: true }) _checkboxes: QueryList<MatCheckbox>;

    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

    @Input()
    get value(): any[] { return this._value; }
    set value(value: any[]) { this.setValue(value); }

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value) { this.setDisabled(value); }

    writeValue(obj: any): void {
        this.setValue(obj, false, false);
        this._cdr.markForCheck();
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngAfterContentInit(): void {
        const checkboxes$ = this._checkboxes.changes.pipe(
            startWith(this._checkboxes),
            map((queryList: QueryList<MatCheckbox>) => queryList.toArray())
        );

        this.subscribe(checkboxes$.pipe(
            tap((checkboxes: MatCheckbox[]) => {
                for (const checkbox of checkboxes) {
                    checkbox.registerOnChange(() => {
                        this.setValue(checkboxes.filter(c => c.checked).map(c => c.value), false);
                    });
                }
            })
        ));

        this.subscribe(checkboxes$.pipe(
            tap((checkboxes: MatCheckbox[]) => {
                for (const checkbox of checkboxes) {
                    checkbox.registerOnTouched(() => { this._onTouched(); });
                }
            })
        ));

        this.updateCheckboxes();
    }

    private setValue(value: any, updateCheckboxes: boolean = true, emitEvent = true): void {
        if (this._value === value) {
            return;
        }

        this._value = value;

        if (updateCheckboxes) {
            this.updateCheckboxes();
        }

        if (emitEvent && this._onChange) {
            this._onChange(value);
        }
    }

    private setDisabled(value: boolean): void {
        this._disabled = coerceBooleanProperty(value);

        this._checkboxes.forEach(checkbox => {
            checkbox.disabled = value;
        });

        this._cdr.detectChanges();
    }

    private updateCheckboxes(): void {
        this._checkboxes.forEach(checkbox => {
            checkbox.checked = Array.isArray(this._value) && this._value.includes(checkbox.value);
        });
    }
}
