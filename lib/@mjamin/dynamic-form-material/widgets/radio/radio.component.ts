import { Component } from "@angular/core";

import { DynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "df-widget-radio",
    templateUrl: "./radio.component.html",
    styleUrls: [ "./radio.component.scss" ],
    viewProviders: [ provideControlContainer() ]
})
export class RadioComponent extends DynamicFormWidgetBase { }
