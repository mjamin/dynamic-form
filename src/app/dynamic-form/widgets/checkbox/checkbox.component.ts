import { Component } from "@angular/core";
import { DynamicFormWidgetBase } from "../../dynamic-form-widget-base";
import { provideControlContainer } from "../../provide-control-container";

@Component({
    selector: "dynamic-form-widget-checkbox",
    templateUrl: "./checkbox.component.html",
    viewProviders: [ provideControlContainer() ]
})
export class CheckboxComponent extends DynamicFormWidgetBase { }
