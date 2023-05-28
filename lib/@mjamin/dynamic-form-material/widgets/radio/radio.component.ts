/* eslint-disable @angular-eslint/component-selector */
import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";
import { MjMatFormFieldControlDirective } from "../../shared/mat-form-field-control/mat-form-field-control.directive";

@Component({
    selector: "mj-dynamic-form-widget-radio",
    templateUrl: "./radio.component.html",
    styleUrls: ["./radio.component.scss"],
    viewProviders: [provideControlContainer()],
    standalone: true,
    imports: [MatFormFieldModule, MatRadioModule, MjMatFormFieldControlDirective, ReactiveFormsModule, NgFor, NgIf]
})
export class RadioComponent extends MjDynamicFormWidgetBase {
    get optionWidth(): number {
        if (!this.field.config?.optionColumns) {
            return null;
        }

        return 1 / this.field.config?.optionColumns * 100;
    }
}
