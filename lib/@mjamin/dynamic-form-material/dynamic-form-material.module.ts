import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MjDynamicFormModule, provideFormWidgets } from "@mjamin/dynamic-form";

import { CheckboxComponent } from "./widgets/checkbox/checkbox.component";
import { CheckboxGroupDirective } from "./widgets/checkbox/checkbox-group.directive";
import { RadioComponent } from "./widgets/radio/radio.component";
import { SelectComponent } from "./widgets/select/select.component";
import { TextareaComponent } from "./widgets/textarea/textarea.component";
import { TextComponent } from "./widgets/text/text.component";
import { HtmlComponent } from "./widgets/html/html.component";
import { MaterialModule } from "./material.module";
import { MjCardFormComponent } from "./forms/card-form.component";
import { MjMatFormFieldControlModule } from "./shared/mat-form-field-control/mat-form-field-control.module";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        MjDynamicFormModule,
        MjMatFormFieldControlModule
    ],
    declarations: [
        CheckboxComponent,
        CheckboxGroupDirective,
        RadioComponent,
        SelectComponent,
        TextareaComponent,
        TextComponent,
        MjCardFormComponent
    ],
    exports: [
        MjMatFormFieldControlModule,
        MjCardFormComponent
    ]
})
export class MjDynamicFormMaterialModule {
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
