import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-app-form-actions",
    templateUrl: "./app-form-actions.component.html",
    styleUrls: ["./app-form-actions.component.scss"],
    standalone: true,
    imports: [MatButtonModule, MatIconModule, NgIf]
})
export class AppFormActionsComponent {
    @Output() saveForm = new EventEmitter<Event>();
    @Output() resetForm = new EventEmitter<void>();
    @Output() deleteForm = new EventEmitter<void>();
    @Output() loadForm = new EventEmitter<void>();

    @Input() valid = false;
}
