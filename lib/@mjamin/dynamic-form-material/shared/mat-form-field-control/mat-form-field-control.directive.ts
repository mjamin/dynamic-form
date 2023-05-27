import { Observable, Subject, merge } from "rxjs";
import { tap, startWith } from "rxjs/operators";
import { Directive, OnDestroy, Optional, Self, ElementRef, HostBinding, Input, Output, EventEmitter, OnInit, DoCheck } from "@angular/core";
import { NgControl, UntypedFormControl, NgForm, FormGroupDirective } from "@angular/forms";
import { FocusMonitor } from "@angular/cdk/a11y";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatFormFieldControl } from "@angular/material/form-field";

import { withSubscriptionSink } from "@mjamin/common";

/**
 * Directive that automatically provides a MatFormFieldControl around any ControlValueAccessor,
 * This helps make form controls that are not supported by default work together with MatFormField
 * (e.g. radio buttons, checkboxes)
 *
 * @todo read error state from form control, emit changes as event
 * @todo empty
 */
@Directive({
    selector: "[mjMatFormFieldControl]",
    exportAs: "mjMatFormFieldControl",
    providers: [
        { provide: MatFormFieldControl, useExisting: MjMatFormFieldControlDirective }
    ]
})
export class MjMatFormFieldControlDirective extends withSubscriptionSink() implements MatFormFieldControl<any>, OnDestroy, OnInit, DoCheck {
    private static _uniqueId = 0;

    private _stateChangesSubject = new Subject<void>();
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
    mjMatFormFieldControlContainerClick = new EventEmitter<MouseEvent>();

    @HostBinding()
    id = `mj-mat-form-field-control-${MjMatFormFieldControlDirective._uniqueId++}`;

    @Input()
    errorStateMatcher: ErrorStateMatcher;

    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) { this._required = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    @Input("mjMatFormFieldControlPlaceholder")
    get placeholder(): string { return this._placeholder; }
    set placeholder(value: string) { this._placeholder = value; this._stateChangesSubject.next(); }

    @Input("mjMatFormFieldControlType")
    get controlType(): string { return this._controlType; }
    set controlType(value: string) { this._controlType = value; this._stateChangesSubject.next(); }

    @Input("mjMatFormFieldControlShouldLabelFloat")
    get shouldLabelFloat(): boolean { return this._shouldLabelFloat; }
    set shouldLabelFloat(value: boolean) { this._shouldLabelFloat = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    @Input("mjMatFormFieldControlErrorState")
    get errorState(): boolean { return this._errorState; }
    set errorState(value: boolean) { this._errorState = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    @Input("mjMatFormFieldControlFocused")
    get focused(): boolean { return this._focused; }
    set focused(value: boolean) { this._focused = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    @Input("mjMatFormFieldControlEmpty")
    get empty(): boolean { return this._empty; }
    set empty(value: boolean) { this._empty = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    @Input("mjMatFormFieldControlAutofilled")
    get autofilled(): boolean { return this._autofilled; }
    set autofilled(value: boolean) { this._autofilled = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

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
        @Optional() @Self() public ngControl: NgControl
    ) {
        super();

        this._focusMonitor.monitor(this._elementRef, true).subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
            this._stateChangesSubject.next();
        });
    }

    setDescribedByIds(ids: string[]): void {
        this._describedBy = ids.join(" ");
    }

    onContainerClick(event: MouseEvent): void {
        this.mjMatFormFieldControlContainerClick.emit(event);
    }

    ngOnInit(): void {
        if (this.ngControl.control) {
            const valueChanges$ = this.ngControl.valueChanges.pipe(
                tap(value => {
                    this.empty = value == null || value.length === 0;
                })
            );

            const statusChanges$ = this.ngControl.statusChanges.pipe(
                startWith(this.ngControl.status),
                tap(status => {
                    if (status === "ENABLED" || status === "DISABLED") {
                        this.disabled = this.ngControl.disabled;
                    }
                })
            );

            this.subscribe(merge(valueChanges$, statusChanges$).pipe(
                tap(() => {
                    this._stateChangesSubject.next();
                })
            ));
        }
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
        this._stateChangesSubject.complete();
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
        const control = this.ngControl ? this.ngControl.control as UntypedFormControl : null;
        const newState = matcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this._stateChangesSubject.next();
        }
    }
}
