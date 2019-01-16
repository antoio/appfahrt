import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface AppError {
  status: number;
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
  constructor() {
    if ( this.error === undefined ) {
      this.error = {
        message: 'Fehler',
        status: 1
      };
    }
  }
  onRetry() {
    this.retry.emit();
  }
}
