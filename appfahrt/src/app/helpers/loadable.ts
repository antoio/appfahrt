import {AppError} from '../other/error/error.component';

export class LoadableComponent {

  _loading: boolean;
  _error: AppError = null;

  constructor() {
    this.loading = true;
    this.error = null;
  }

  set loading(status: boolean) {
    this._loading = status;
  }

  get loading() {
    return this._loading;
  }
  set error(error: AppError) {
    this._error = error;
  }
  get error() {
    return this._error;
  }

}
