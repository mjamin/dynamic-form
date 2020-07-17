import { Component } from "@angular/core";

import { DynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "df-widget-text",
    templateUrl: "./text.component.html",
    viewProviders: [ provideControlContainer() ]
})
export class TextComponent extends DynamicFormWidgetBase { }
