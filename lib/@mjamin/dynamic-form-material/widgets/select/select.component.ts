import { Component } from "@angular/core";

import { DynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "df-widget-select",
    templateUrl: "./select.component.html",
    viewProviders: [ provideControlContainer() ]
})
export class SelectComponent extends DynamicFormWidgetBase { }
