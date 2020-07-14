import { Component } from "@angular/core";
import { DynamicFormWidgetBase } from "../../dynamic-form-widget-base";
import { provideControlContainer } from "../../provide-control-container";

@Component({
    selector: "dynamic-form-widget-radio",
    templateUrl: "./radio.component.html",
    styleUrls: [ "./radio.component.scss" ],
    viewProviders: [ provideControlContainer() ]
})
export class RadioComponent extends DynamicFormWidgetBase { }
