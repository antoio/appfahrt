import { Component, Input } from '@angular/core';
import { StationsService } from './stations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  providers: [ StationsService ]
})
export class StationsComponent {
  error: any;
  headers: string[];
  stations: any;

  private _coordinates = {
    x: 8.522655,
    y: 47.386688
  };

  @Input()
  set coordinates(coordinates: {x: number, y: number}) {
    this._coordinates = coordinates;
  }

  constructor(private stationsService: StationsService) {}

  clear() {
    this.stations = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  getStations() {
    this.stationsService.getStations(this._coordinates.x, this._coordinates.y)
      .subscribe(
        (data: any) => { this.stations = { ...data }; },
        error => this.error = error
      );
  }
}
