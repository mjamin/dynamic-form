import { Component } from "@angular/core";

import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "mj-dynamic-form-widget-text",
    templateUrl: "./text.component.html",
    viewProviders: [ provideControlContainer() ]
})
export class TextComponent extends MjDynamicFormWidgetBase { }
