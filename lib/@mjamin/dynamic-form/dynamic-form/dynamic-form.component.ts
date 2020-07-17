import { Component, ChangeDetectionStrategy, forwardRef } from "@angular/core";

import { MjDynamicFormBase } from "./dynamic-form-base";
import { provideFormGroupDirective } from "./provide-form-group-directive";

@Component({
    selector: "mj-dynamic-form",
    templateUrl: "./dynamic-form.component.html",
    styleUrls: ["./dynamic-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ provideFormGroupDirective(forwardRef(() => DynamicFormComponent)) ]
})
export class DynamicFormComponent extends MjDynamicFormBase { }
