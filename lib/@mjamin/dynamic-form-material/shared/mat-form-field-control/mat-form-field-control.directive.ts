import { Observable, Subject, Subscription, merge } from "rxjs";
import { tap, startWith } from "rxjs/operators";
import { Directive, OnDestroy, Optional, Self, ElementRef, HostBinding, Input, Output, EventEmitter, Inject, OnInit, DoCheck } from "@angular/core";
import { NgControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NgForm, FormGroupDirective } from "@angular/forms";
import { FocusMonitor } from "@angular/cdk/a11y";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatFormFieldControl } from "@angular/material/form-field";

import { selectValueAccessor } from "./selectValueAccessor";

/**
 * Directive that automatically provides a MatFormFieldControl around any ControlValueAccessor,
 * This helps make form controls that are not supported by default work together with MatFormField
 * (e.g. radio buttons, checkboxes)
 *
 * @todo read error state from form control, emit changes as event
 * @todo empty
 */
@Directive({
    selector: "[matFormFieldControl]",
    exportAs: "matFormFieldControl",
    providers: [
        { provide: MatFormFieldControl, useExisting: MatFormFieldControlDirective }
    ],
})
export class MatFormFieldControlDirective implements MatFormFieldControl<any>, OnDestroy, OnInit, DoCheck {
    private static _uniqueId = 0;

    private _stateChangesSubject = new Subject<void>();
    private _changesSubscription: Subscription;
    private _placeholder: string;
    private _required: boolean;
    private _controlType: string;
    private _shouldLabelFloat: boolean;
    private _errorState: boolean;
    private _focused: boolean;
    private _empty: boolean;
    private _autofilled: boolean;
    private _disabled: boolean;
    private _describedBy: string;

    @Output()
    matFormFieldControlContainerClick = new EventEmitter<MouseEvent>();

    @HostBinding()
    id = `mat-form-field-control-${MatFormFieldControlDirective._uniqueId++}`;

    @Input()
    errorStateMatcher: ErrorStateMatcher;

    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) { this._required = value; this._stateChangesSubject.next(); }

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) { this._disabled = value; this._stateChangesSubject.next(); }

    @Input("matFormFieldControlPlaceholder")
    get placeholder(): string { return this._placeholder; }
    set placeholder(value: string) { this._placeholder = value; this._stateChangesSubject.next(); }

    @Input("matFormFieldControlType")
    get controlType(): string { return this._controlType; }
    set controlType(value: string) { this._controlType = value; this._stateChangesSubject.next(); }

    @Input("matFormFieldControlShouldLabelFloat")
    get shouldLabelFloat(): boolean { return this._shouldLabelFloat; }
    set shouldLabelFloat(value: boolean) { this._shouldLabelFloat = value; this._stateChangesSubject.next(); }

    @Input("matFormFieldControlErrorState")
    get errorState(): boolean { return this._errorState; }
    set errorState(value: boolean) { this._errorState = value; this._stateChangesSubject.next(); }

    @Input("matFormFieldControlFocused")
    get focused(): boolean { return this._focused; }
    set focused(value: boolean) { this._focused = value; this._stateChangesSubject.next(); }

    @Input("matFormFieldControlEmpty")
    get empty(): boolean { return this._empty; }
    set empty(value: boolean) { this._empty = value; this._stateChangesSubject.next(); }

    @Input("matFormFieldControlAutofilled")
    get autofilled(): boolean { return this._autofilled; }
    set autofilled(value: boolean) { this._autofilled = value; this._stateChangesSubject.next(); }

    @HostBinding("attr.aria-describedby")
    get describedBy(): string { return this._describedBy; }

    get stateChanges(): Observable<void> { return this._stateChangesSubject.asObservable(); }

    get value(): any { return this.ngControl.value; }

    constructor(
        private _defaultErrorStateMatcher: ErrorStateMatcher,
        private _elementRef: ElementRef,
        private _focusMonitor: FocusMonitor,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]
    ) {
        this._focusMonitor.monitor(this._elementRef, true).subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
            this._stateChangesSubject.next();
        });

        if (this.ngControl) {
            this.ngControl.valueAccessor = selectValueAccessor(this.ngControl, valueAccessors);
        }
    }

    setDescribedByIds(ids: string[]): void {
        this._describedBy = ids.join(" ");
    }

    onContainerClick(event: MouseEvent): void {
        this.matFormFieldControlContainerClick.emit(event);
    }

    ngOnInit(): void {
        if (this.ngControl.control) {
            const valueChanges$ = this.ngControl.valueChanges;

            const statusChanges$ = this.ngControl.statusChanges.pipe(
                startWith(this.ngControl.status),
                tap(status => {
                    if (status === "ENABLED" || status === "DISABLED") {
                        this.disabled = this.ngControl.disabled;
                    }
                })
            );

            this._changesSubscription = merge(valueChanges$, statusChanges$).pipe(
                tap(() => {
                    this._stateChangesSubject.next();
                })
            ).subscribe();
        }
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);

        if (this._changesSubscription) {
            this._changesSubscription.unsubscribe();
        }
    }

    ngDoCheck(): void {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    private updateErrorState(): void {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
        const control = this.ngControl ? this.ngControl.control as FormControl : null;
        const newState = matcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this._stateChangesSubject.next();
        }
    }
}