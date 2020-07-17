import { Component, ViewEncapsulation } from "@angular/core";

import { DynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "df-widget-checkbox",
    templateUrl: "./checkbox.component.html",
    styleUrls: ["./checkbox.component.scss"],
    encapsulation: ViewEncapsulation.None,
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
