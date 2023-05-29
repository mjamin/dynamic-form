/* eslint-disable @angular-eslint/directive-selector */
import { FocusMonitor } from "@angular/cdk/a11y";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Directive, DoCheck, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self } from "@angular/core";
import { FormGroupDirective, NgControl, NgForm, UntypedFormControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatFormFieldControl } from "@angular/material/form-field";
import { Observable, Subject, merge } from "rxjs";
import { startWith, tap } from "rxjs/operators";

import { withSubscriptionSink } from "@mjamin/common";

/**
 * A directive that automatically provides a MatFormFieldControl around any ControlValueAccessor,
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
    ],
    standalone: true
})
export class MjMatFormFieldControlDirective<T> extends withSubscriptionSink() implements MatFormFieldControl<T>, OnDestroy, OnInit, DoCheck {
    private static _uniqueId = 0;

    private _stateChangesSubject = new Subject<void>();
    private _placeholder: string;
    private _required = false;
    private _controlType: string;
    private _shouldLabelFloat: boolean;
    private _errorState = false;
    private _focused = false;
    private _empty = false;
    private _autofilled = false;
    private _disabled = false;
    private _describedBy: string;

    /**
     * Emits when the container of this control is clicked.
     */
    @Output() mjMatFormFieldControlContainerClick = new EventEmitter<MouseEvent>();

    /**
     * The id of this control.
     */
    @HostBinding() id = `mj-mat-form-field-control-${MjMatFormFieldControlDirective._uniqueId++}`;

    /**
     * The error state matcher used by this control.
     */
    @Input() errorStateMatcher: ErrorStateMatcher;

    /**
     * Wether this control is required.
     */
    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) { this._required = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    /**
     * Wether this control is disabled.
     */
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    /**
     * The placeholder of this control.
     */
    @Input("mjMatFormFieldControlPlaceholder")
    get placeholder(): string { return this._placeholder; }
    set placeholder(value: string) { this._placeholder = value; this._stateChangesSubject.next(); }

    /**
     * The control type of this control.
     */
    @Input("mjMatFormFieldControlType")
    get controlType(): string { return this._controlType; }
    set controlType(value: string) { this._controlType = value; this._stateChangesSubject.next(); }

    /**
     * Wether the label of this control should float.
     */
    @Input("mjMatFormFieldControlShouldLabelFloat")
    get shouldLabelFloat(): boolean { return this._shouldLabelFloat; }
    set shouldLabelFloat(value: boolean) { this._shouldLabelFloat = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    /**
     * Wether this control is in an error state.
     */
    @Input("mjMatFormFieldControlErrorState")
    get errorState(): boolean { return this._errorState; }
    set errorState(value: boolean) { this._errorState = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    /**
     * Wether this control is focused.
     */
    @Input("mjMatFormFieldControlFocused")
    get focused(): boolean { return this._focused; }
    set focused(value: boolean) { this._focused = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    /**
     * Wether this control is empty.
     */
    @Input("mjMatFormFieldControlEmpty")
    get empty(): boolean { return this._empty; }
    set empty(value: boolean) { this._empty = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    /**
     * Wether this control is autofilled.
     */
    @Input("mjMatFormFieldControlAutofilled")
    get autofilled(): boolean { return this._autofilled; }
    set autofilled(value: boolean) { this._autofilled = coerceBooleanProperty(value); this._stateChangesSubject.next(); }

    /**
     * The id of the elements that describe this control.
     */
    @HostBinding("attr.aria-describedby")
    get describedBy(): string { return this._describedBy; }

    /**
     * The observable that emits when the state of this control changes.
     */
    get stateChanges(): Observable<void> { return this._stateChangesSubject.asObservable(); }

    /**
     * The value of this control.
     */
    get value(): T { return this.ngControl.value; }

    /**
     * Creates a new instance of MjMatFormFieldControlDirective.
     * 
     * @param _defaultErrorStateMatcher The default error state matcher.
     * @param _elementRef The element ref.
     * @param _focusMonitor The focus monitor.
     * @param _parentForm The parent form.
     * @param _parentFormGroup The parent form group.
     * @param ngControl The ng control.
     */
    constructor(
        private _defaultErrorStateMatcher: ErrorStateMatcher,
        private _elementRef: ElementRef,
        private _focusMonitor: FocusMonitor,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
        /**
         * The ng control.
         */
        @Optional() @Self() public ngControl: NgControl
    ) {
        super();

        this._focusMonitor.monitor(this._elementRef, true).subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
        });
    }

    /**
     * Sets the ids of the elements that describe this control.
     * 
     * @param ids The ids.
     */
    setDescribedByIds(ids: string[]): void {
        this._describedBy = ids.join(" ");
    }

    /**
     * Handles the click on the container of this control.
     * 
     * @param event The event.
     */
    onContainerClick(event: MouseEvent): void {
        this.mjMatFormFieldControlContainerClick.emit(event);
    }

    /** @inheritdoc */
    ngDoCheck(): void {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    /** @inheritdoc */
    ngOnInit(): void {
        if (this.ngControl.control) {
            const valueChanges$ = this.ngControl.valueChanges.pipe(
                tap(value => {
                    this._empty = value === null || value.length === 0;
                })
            );

            const statusChanges$ = this.ngControl.statusChanges.pipe(
                startWith(this.ngControl.status),
                tap(status => {
                    if (status === "ENABLED" || status === "DISABLED") {
                        this._disabled = this.ngControl.disabled;
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

    /** @inheritdoc */
    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
        this._stateChangesSubject.complete();
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
