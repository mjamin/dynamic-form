import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-app-form-actions',
  templateUrl: './app-form-actions.component.html',
  styleUrls: ['./app-form-actions.component.scss']
})
export class AppFormActionsComponent {
    @Input() valid = false;

    @Input() test: number;

    @Output() save = new EventEmitter<Event>();
    @Output() reset = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Output() load = new EventEmitter<void>();
}
