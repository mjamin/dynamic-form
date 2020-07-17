import { Component, ChangeDetectionStrategy, forwardRef } from "@angular/core";

import { DynamicFormBase, provideFormGroupDirective } from "@mjamin/dynamic-form";

@Component({
    selector: "df-mat-card-form",
    templateUrl: "./card-form.component.html",
    styleUrls: ["./card-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ provideFormGroupDirective(forwardRef(() => CardFormComponent)) ]
})
export class CardFormComponent extends DynamicFormBase { }
