/* eslint-disable @angular-eslint/component-selector */
import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

/**
 * A dynamic form widget for select boxes.
 */
@Component({
    selector: "mj-dynamic-form-widget-select",
    templateUrl: "./select.component.html",
    viewProviders: [provideControlContainer()],
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, NgFor, MatOptionModule, NgIf]
})
export class SelectComponent extends MjDynamicFormWidgetBase { }
