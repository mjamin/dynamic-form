/* eslint-disable @angular-eslint/directive-selector */
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterContentInit, ChangeDetectorRef, ContentChildren, Directive, Input, QueryList } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import { withSubscriptionSink } from "@mjamin/common";
import { map, startWith, tap } from "rxjs/operators";

@Directive({
    selector: "mj-dynamic-form-widget-checkbox-group",
    exportAs: "dfCheckboxGroup",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxGroupDirective, multi: true }
    ],
    standalone: true
})
export class CheckboxGroupDirective extends withSubscriptionSink() implements ControlValueAccessor, AfterContentInit {
    private _value: string[] = null;
    private _disabled: boolean;
    private _onChange: (value: string[]) => void = null;
    private _onTouched: () => void = null;

    // tslint:disable-next-line: member-ordering
    @ContentChildren(MatCheckbox, { descendants: true }) checkboxes: QueryList<MatCheckbox>;

    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

    @Input()
    get value(): string[] { return this._value; }
    set value(value: string[]) { this.setValue(value); }

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value) { this.setDisabled(value); }

    writeValue(obj: string[]): void {
        this.setValue(obj, true, false);
        this._cdr.markForCheck();
    }

    registerOnChange(fn: (value: string[]) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngAfterContentInit(): void {
        const checkboxes$ = this.checkboxes.changes.pipe(
            startWith(this.checkboxes),
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
                    checkbox.registerOnTouched(() => {
                        if(this._onTouched) {
                            this._onTouched();
                        }
                    });
                }
            })
        ));

        this.updateCheckboxes();
    }

    private setValue(value: string[], updateCheckboxes = true, emitEvent = true): void {
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

        if(!this.checkboxes) {
            return;
        }

        this.checkboxes.forEach(checkbox => {
            checkbox.disabled = value;
        });

        this._cdr.detectChanges();
    }

    private updateCheckboxes(): void {
        if(!this.checkboxes) {
            return;
        }
        
        this.checkboxes.forEach(checkbox => {
            checkbox.checked = Array.isArray(this._value) && this._value.includes(checkbox.value);
        });
    }
}
