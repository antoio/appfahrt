import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface AppError {
  status: boolean;
  message: String;
}

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @Input() error: AppError;
  @Output() retry: EventEmitter<any> = new EventEmitter();
  constructor() { }
  onRetry() {
    this.retry.emit();
  }
}
