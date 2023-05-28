/* eslint-disable @angular-eslint/component-selector */
import { NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MjDynamicFormBase } from "./dynamic-form-base";
import { MjDynamicFormWidgetContainerComponent } from "./dynamic-form-widget-container.component";
import { provideFormGroupDirective } from "./provide-form-group-directive";

@Component({
    selector: "mj-dynamic-form",
    templateUrl: "./dynamic-form.component.html",
    styleUrls: ["./dynamic-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideFormGroupDirective(forwardRef(() => DynamicFormComponent))],
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, NgFor, MjDynamicFormWidgetContainerComponent]
})
export class DynamicFormComponent extends MjDynamicFormBase { }
