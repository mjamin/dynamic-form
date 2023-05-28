import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { provideFormWidgets } from "@mjamin/dynamic-form";
import { MjCardFormComponent } from "./forms/card-form.component";
import { CheckboxGroupDirective } from "./widgets/checkbox/checkbox-group.directive";
import { CheckboxComponent } from "./widgets/checkbox/checkbox.component";
import { HtmlComponent } from "./widgets/html/html.component";
import { RadioComponent } from "./widgets/radio/radio.component";
import { SelectComponent } from "./widgets/select/select.component";
import { TextComponent } from "./widgets/text/text.component";
import { TextareaComponent } from "./widgets/textarea/textarea.component";

/**
 * A module for dynamic forms using Angular Material.
 */
@NgModule({
    imports: [
        CommonModule,
        CheckboxComponent,
        CheckboxGroupDirective,
        RadioComponent,
        SelectComponent,
        TextareaComponent,
        TextComponent,
        MjCardFormComponent
    ],
    exports: [
        MjCardFormComponent
    ]
})
export class MjDynamicFormMaterialModule {
    /**
     * Creates a module with providers for dynamic forms using Angular Material.
     * 
     * Provides the following widgets:
     * - checkbox
     * - radio
     * - select
     * - textarea
     * - text
     * - html
     * 
     * @returns A module with providers for dynamic forms using Angular Material.
     */
    static forRoot(): ModuleWithProviders<MjDynamicFormMaterialModule> {
        return {
            ngModule: MjDynamicFormMaterialModule,
            providers: [
                provideFormWidgets({
                    checkbox: CheckboxComponent,
                    radio: RadioComponent,
                    select: SelectComponent,
                    textarea: TextareaComponent,
                    text: TextComponent,
                    html: HtmlComponent
                })
            ]
        };
    }
}
