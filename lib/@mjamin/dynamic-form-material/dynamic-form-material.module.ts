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
