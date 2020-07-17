import { NgModule } from "@angular/core";

import { MjMatFormFieldControlDirective } from "./mat-form-field-control.directive";

@NgModule({
    declarations: [
        MjMatFormFieldControlDirective
    ],
    exports: [
        MjMatFormFieldControlDirective
    ]
})
export class MjMatFormFieldControlModule { }
