/* eslint-disable @angular-eslint/component-selector */
import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MjDynamicFormWidgetBase, provideControlContainer } from "@mjamin/dynamic-form";

@Component({
    selector: "mj-dynamic-form-widget-text",
    templateUrl: "./text.component.html",
    viewProviders: [provideControlContainer()],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf]
})
export class TextComponent extends MjDynamicFormWidgetBase { }
