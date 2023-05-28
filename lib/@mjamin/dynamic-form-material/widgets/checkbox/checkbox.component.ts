/* eslint-disable @angular-eslint/component-selector */
import { NgFor, NgIf } from "@angular/common";
import { Component, ViewEncapsulation } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule, _MatCheckboxRequiredValidatorModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";
import { MjMatFormFieldControlDirective } from "../../shared/mat-form-field-control/mat-form-field-control.directive";
import { CheckboxGroupDirective } from "./checkbox-group.directive";

/**
 * Note that there's some code duplication in the template. This is because having an *ngIf on the MatFormFieldControl leads to errors.
 * Someone ran into similar issues here: https://github.com/angular/components/issues/16209
 * Probably solved as well when/if this issue is addressed: https://github.com/angular/angular/issues/37319
 */
@Component({
    selector: "mj-dynamic-form-widget-checkbox",
    templateUrl: "./checkbox.component.html",
    styleUrls: ["./checkbox.component.scss"],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [provideControlContainer()],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatCheckboxModule, _MatCheckboxRequiredValidatorModule, MjMatFormFieldControlDirective, ReactiveFormsModule, CheckboxGroupDirective, NgFor]
})
export class CheckboxComponent extends MjDynamicFormWidgetBase {
    override get labelVisible(): boolean {
        return super.labelVisible && this.hasOptions;
    }

    get optionWidth(): number {
        if (!this.field.config?.optionColumns) {
            return null;
        }

        return 1 / this.field.config?.optionColumns * 100;
    }

    get hasOptions(): boolean {
        return !!this.field.config?.options;
    }
}
