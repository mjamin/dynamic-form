/* eslint-disable @angular-eslint/component-selector */
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { provideControlContainer } from "../../core/provide-control-container";
import { MjDynamicFormWidgetBase } from "../../dynamic-form/dynamic-form-widget-base";

/**
 * A placeholder form widget for unknown widget types.
 */
@Component({
    selector: "mj-dynamic-form-widget-placeholder",
    templateUrl: "./placeholder.component.html",
    styleUrls: ["./placeholder.component.scss"],
    viewProviders: [provideControlContainer()],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class PlaceholderComponent extends MjDynamicFormWidgetBase { }
