export class LoadableComponent {

  _loading: boolean;

  constructor() {
    this.loading = true;
  }
  set loading(status: boolean) {
    this._loading = status;
  }
  get loading() {
    return this._loading;
  }

}
