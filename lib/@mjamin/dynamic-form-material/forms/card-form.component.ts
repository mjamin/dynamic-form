/* eslint-disable @angular-eslint/component-selector */
import { NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MjDynamicFormBase, provideFormGroupDirective } from "@mjamin/dynamic-form";
import { MjDynamicFormWidgetContainerComponent } from "../../dynamic-form/dynamic-form/dynamic-form-widget-container.component";

/**
 * A material design dynamic form.
 */
@Component({
    selector: "mj-dynamic-card-form",
    templateUrl: "./card-form.component.html",
    styleUrls: ["./card-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideFormGroupDirective(forwardRef(() => MjCardFormComponent))],
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatTabsModule, NgFor, MatCardModule, MjDynamicFormWidgetContainerComponent]
})
export class MjCardFormComponent extends MjDynamicFormBase { }
