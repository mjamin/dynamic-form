import { Component } from "@angular/core";

import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "mj-dynamic-form-widget-select",
    templateUrl: "./select.component.html",
    viewProviders: [ provideControlContainer() ]
})
export class SelectComponent extends MjDynamicFormWidgetBase { }
