import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { CheckboxGroupDirective } from "./checkbox-group.directive";

@NgModule({
    imports: [
        ReactiveFormsModule
    ],
    declarations: [
        CheckboxGroupDirective
    ],
    exports: [
        CheckboxGroupDirective
    ]
})
export class CheckboxGroupModule { }
