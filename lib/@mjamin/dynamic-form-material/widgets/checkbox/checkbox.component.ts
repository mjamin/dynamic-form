import { Component, ViewEncapsulation } from "@angular/core";

import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

/**
 * Note that there's some code duplication in the template. This is because having an *ngIf on the MatFormFieldControl leads to errors.
 * Someone ran into similar issues here: https://github.com/angular/components/issues/16209
 * Probably solved as well when/if this issue is addressed: https://github.com/angular/angular/issues/37319
 */
@Component({
    selector: "mj-dynamic-form-widget-checkbox",
    templateUrl: "./checkbox.component.html",
    styleUrls: ["./checkbox.component.scss"],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [ provideControlContainer() ]
})
export class CheckboxComponent extends MjDynamicFormWidgetBase {
    get labelVisible(): boolean {
        return super.labelVisible && this.hasOptions;
    }

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
