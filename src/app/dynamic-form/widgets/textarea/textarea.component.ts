import { Component } from "@angular/core";
import { DynamicFormWidgetBase } from "../../dynamic-form-widget-base";
import { provideControlContainer } from "../../provide-control-container";

@Component({
    selector: "dynamic-form-widget-textarea",
    templateUrl: "./textarea.component.html",
    viewProviders: [ provideControlContainer() ]
})
export class TextareaComponent extends DynamicFormWidgetBase { }
