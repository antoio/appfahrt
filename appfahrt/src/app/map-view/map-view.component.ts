import { Component, OnInit, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { StationsService } from './../stations/stations.service';
import { Station } from './../stations/station';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  providers: [ StationsService ]
})
export class MapViewComponent implements OnInit {

  error: any;
  stations: Station[];

  private _coordinates = {
    x: 8.815174,
    y: 47.2233607
  };
  private _tempCoordintes = {
    x: 8.815174,
    y: 47.2233607
  };

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private stationsService: StationsService) {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.setCoordinates(
        position.coords.longitude, position.coords.latitude));
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  private setCoordinates = (long: number, lat: number) => {
    const newCoordinates = {
      x: long,
      y: lat
    };
    this._coordinates = newCoordinates;
  }
  get coordinates(): {x: number, y: number} { return this._coordinates; }
  mapChanged($event: any) {
    this._tempCoordintes = {
      x: $event.lng,
      y: $event.lat
    };
  }
  mouseUpEvent($event: any) {
    if (this._tempCoordintes.x !== this.coordinates.x && this._tempCoordintes.y !== this.coordinates.y) {
      this.setCoordinates(this._tempCoordintes.x, this._tempCoordintes.y);
      this.getStations();
    }
  }
  markerClick(station: Station) {
    console.log('show station', station);
  }

  ngOnInit() {
    this.getStations();
  }
  getStations() {
    this.stationsService.getStations(this.coordinates.x, this.coordinates.y)
      .subscribe(
        (data: any) => {
          this.stations = [];
          data.stations.map((station: any) => {
            const newStation = {
              name: station.name,
              id: station.id,
              long: station.coordinate.y,
              lat: station.coordinate.x
            };
            if (newStation.name && newStation.id) {
              this.stations.push(newStation as Station);
            }
          });
          },
        error => this.error = error
      );
  }

}
