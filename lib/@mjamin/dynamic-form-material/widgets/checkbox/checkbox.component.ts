import { Component, ViewEncapsulation } from "@angular/core";

import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "mj-dynamic-form-widget-checkbox",
    templateUrl: "./checkbox.component.html",
    styleUrls: ["./checkbox.component.scss"],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [ provideControlContainer() ],
    host: {
        "[class.single]": "!hasOptions"
    }
})
export class CheckboxComponent extends MjDynamicFormWidgetBase {
    get hasOptions(): boolean {
        return !!this.field.config?.options;
    }
}
