import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { PortalModule } from "@angular/cdk/portal";

import { DynamicFormComponent } from "./dynamic-form.component";
import { DynamicFormWidgetContainerComponent } from "./dynamic-form-widget-container.component";

@NgModule({
    imports: [
        CommonModule,
        PortalModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicFormComponent,
        DynamicFormWidgetContainerComponent
    ],
    exports: [
        DynamicFormComponent,
        DynamicFormWidgetContainerComponent,
        ReactiveFormsModule
    ]
})
export class DynamicFormModule { }
