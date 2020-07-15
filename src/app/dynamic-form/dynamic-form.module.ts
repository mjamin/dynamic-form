import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { PortalModule } from "@angular/cdk/portal";

import { MaterialModule } from "../shared/modules/material/material.module";
import { MatFormFieldControlModule } from "../shared/modules/mat-form-field-control/mat-form-field-control.module";
import { CheckboxGroupModule } from "../shared/modules/checkbox-group/checkbox-group.module";

import { CheckboxComponent } from "./widgets/checkbox/checkbox.component";
import { RadioComponent } from "./widgets/radio/radio.component";
import { SelectComponent } from "./widgets/select/select.component";
import { TextareaComponent } from "./widgets/textarea/textarea.component";
import { TextComponent } from "./widgets/text/text.component";
import { DynamicFormComponent } from "./dynamic-form.component";
import { DynamicFormWidgetContainerComponent } from "./dynamic-form-widget-container.component";
import { provideFormWidgets } from "./dynamic-form-widgets";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PortalModule,
        MaterialModule,
        MatFormFieldControlModule,
        CheckboxGroupModule,
    ],
    declarations: [
        DynamicFormComponent,
        DynamicFormWidgetContainerComponent,
        CheckboxComponent,
        RadioComponent,
        SelectComponent,
        TextareaComponent,
        TextComponent
    ],
    exports: [
        DynamicFormComponent
    ]
})
export class DynamicFormModule {
    static forRoot(): ModuleWithProviders<DynamicFormModule> {
        return {
            ngModule: DynamicFormModule,
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
