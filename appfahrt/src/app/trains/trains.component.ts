import { Component, Input } from '@angular/core';
import {TrainsService} from './trains.service';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  providers: [ TrainsService ]
})
export class TrainsComponent {
  error: any;
  headers: string[];
  trains: any;

  private _stationId = '8503110';
  private _stationName = '';

  @Input()
  set stationId(stationId: string) {
    this._stationId = stationId;
  }
  get stationName() { return this._stationId; }

  constructor(private trainsService: TrainsService) {}

  clear() {
    this.trains = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  getTrains() {
    this.trainsService.getTrains(this._stationId)
      .subscribe(
        (data: any) => { this.trains = { ...data }; },
        error => this.error = error
      );
  }
}
