import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import LonLat from 'ol/layer';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  private _coordinates = {
    x: 8.815174,
    y: 47.2233607
  };

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

  constructor() {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.setCoordinates(position));
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  private setCoordinates = (position: any) => {
    const newCoordinates = {
      x: position.coords.longitude,
      y: position.coords.latitude
    };
    this._coordinates = newCoordinates;
    this.view.setCenter( fromLonLat([newCoordinates.x, newCoordinates.y]));
  }
  get coordinates(): {x: number, y: number} { return this._coordinates; }

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([this.coordinates.x, this.coordinates.y]),
      zoom: 16
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }

}
