import { Component } from "@angular/core";

import { DynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "df-widget-textarea",
    templateUrl: "./textarea.component.html",
    viewProviders: [ provideControlContainer() ]
})
export class TextareaComponent extends DynamicFormWidgetBase { }
