import { NgModule } from "@angular/core";

import { MatFormFieldControlDirective } from "./mat-form-field-control.directive";

@NgModule({
    declarations: [
        MatFormFieldControlDirective
    ],
    exports: [
        MatFormFieldControlDirective
    ]
})
export class MatFormFieldControlModule { }
