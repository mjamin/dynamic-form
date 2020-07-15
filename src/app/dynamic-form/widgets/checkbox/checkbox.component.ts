import { Component } from "@angular/core";
import { DynamicFormWidgetBase } from "../../dynamic-form-widget-base";
import { provideControlContainer } from "../../provide-control-container";

@Component({
    selector: "dynamic-form-widget-checkbox",
    templateUrl: "./checkbox.component.html",
    styleUrls: ["./checkbox.component.scss"],
    viewProviders: [ provideControlContainer() ],
    host: {
        "[class.single]": "!hasOptions"
    }
})
export class CheckboxComponent extends DynamicFormWidgetBase {
    get hasOptions(): boolean {
        return !!this.field.config?.options;
    }
}
