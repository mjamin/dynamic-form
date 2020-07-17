import { Component, ChangeDetectionStrategy, forwardRef } from "@angular/core";

import { MjDynamicFormBase, provideFormGroupDirective } from "@mjamin/dynamic-form";

@Component({
    selector: "mj-dynamic-card-form",
    templateUrl: "./card-form.component.html",
    styleUrls: ["./card-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ provideFormGroupDirective(forwardRef(() => MjCardFormComponent)) ]
})
export class MjCardFormComponent extends MjDynamicFormBase { }
