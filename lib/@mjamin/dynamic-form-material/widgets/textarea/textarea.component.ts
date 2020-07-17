import { Component } from "@angular/core";

import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "mj-dynamic-form-widget-textarea",
    templateUrl: "./textarea.component.html",
    viewProviders: [ provideControlContainer() ]
})
export class TextareaComponent extends MjDynamicFormWidgetBase { }
