import { Component } from "@angular/core";

import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "mj-dynamic-form-widget-radio",
    templateUrl: "./radio.component.html",
    styleUrls: [ "./radio.component.scss" ],
    viewProviders: [ provideControlContainer() ]
})
export class RadioComponent extends MjDynamicFormWidgetBase { }
