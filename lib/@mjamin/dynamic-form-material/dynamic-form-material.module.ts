import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DynamicFormModule, provideFormWidgets } from "@mjamin/dynamic-form";

import { CheckboxComponent } from "./widgets/checkbox/checkbox.component";
import { CheckboxGroupDirective } from "./widgets/checkbox/checkbox-group.directive";
import { RadioComponent } from "./widgets/radio/radio.component";
import { SelectComponent } from "./widgets/select/select.component";
import { TextareaComponent } from "./widgets/textarea/textarea.component";
import { TextComponent } from "./widgets/text/text.component";
import { MaterialModule } from "./material.module";
import { CardFormComponent } from "./forms/card-form.component";
import { MatFormFieldControlModule } from "./shared/mat-form-field-control/mat-form-field-control.module";

@NgModule({
    imports: [
        CommonModule,
        DynamicFormModule,
        MaterialModule,
        MatFormFieldControlModule
    ],
    declarations: [
        CheckboxComponent,
        CheckboxGroupDirective,
        RadioComponent,
        SelectComponent,
        TextareaComponent,
        TextComponent,
        CardFormComponent
    ],
    exports: [
        MatFormFieldControlModule,
        CardFormComponent
    ]
})
export class DynamicFormMaterialModule {
    static forRoot(): ModuleWithProviders<DynamicFormMaterialModule> {
        return {
            ngModule: DynamicFormMaterialModule,
            providers: [
                provideFormWidgets({
                    checkbox: CheckboxComponent,
                    radio: RadioComponent,
                    select: SelectComponent,
                    textarea: TextareaComponent,
                    text: TextComponent
                })
            ]
        };
    }
}
