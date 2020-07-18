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
    get optionWidth(): number {
        if (!this.field.config?.optionColumns) {
            return null;
        }

        return 1 / this.field.config?.optionColumns * 100;
    }

    get hasOptions(): boolean {
        return !!this.field.config?.options;
    }
}
