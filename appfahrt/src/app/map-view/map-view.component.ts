import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {StationsService} from '../board/stations/stations.service';
import {Station} from '../board/stations/station';
import {AppError} from '../other/error/error.component';
import {EnableGeolocationDialogComponent} from '../dialogs/enable-geolocation/enable-geolocation-dialog.component';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {STYLE} from './map-style';

interface Coordinates {
  x: number;
  y: number;
}

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  providers: [StationsService]
})
export class MapViewComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private stationsService: StationsService,
              public dialog: MatDialog,
              public router: Router,
              private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches) {
        this.smallSize = result.matches;
        return;
      } else {
        this.smallSize = false;
      }
    });
  }

  get coordinates(): Coordinates {
    return this._coordinates;
  }

  userCoordinates: Coordinates | null = null;

  loading = true;
  error: AppError = null;
  stations: Station[];
  geolocationDenied = false;
  map: any;
  dragEventListener: any;
  smallSize = false;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  windowHeight: number = window.innerHeight;

  get mapHeight(): number {
    return this.windowHeight - 64 - (this.smallSize ? 46 : 0);
  }

  private _coordinates: Coordinates = {
    x: 8.815174,
    y: 47.2233607
  };
  private _tempCoordintes: Coordinates = {
    x: 8.815174,
    y: 47.2233607
  };
  marker = {
    url: 'assets/marker_small.svg',
    scaledSize: {
      width: 40,
      height: 60
    },
    anchor: {
      x: 20,
      y: 60
    }
  };
  markerPos = {
    url: 'assets/marker_pos.svg',
    scaledSize: {
      width: 40,
      height: 40
    }
  };
  private setCoordinates = (long: number, lat: number) => {
    const newCoordinates: Coordinates = {
      x: long,
      y: lat
    };
    this._coordinates = newCoordinates;
    this.ngZone.run(() => this.router.navigate(
      [],
      {
        queryParams: this._coordinates,
        queryParamsHandling: 'merge'
      }));
  }

  mapChanged($event: any) {
    this._tempCoordintes = {
      x: $event.lng,
      y: $event.lat
    };
  }

  mapReady(map) {
    console.log(map);
    map.styles = STYLE;
    // Hack: https://github.com/SebastianM/angular-google-maps/issues/1092
    // GMaps events: https://developers.google.com/maps/documentation/javascript/events
    this.map = map;
    this.dragEventListener = this.map.addListener('dragend', () => {
      if (this._tempCoordintes) {
        this.setCoordinates(this._tempCoordintes.x, this._tempCoordintes.y);
        this.getStations();
      }
    }, {passive: true});
  }

  markerClick(station: Station) {
  }

  getLocationFromAutocomplete(location: { x: number, y: number }) {
    this.setCoordinates(location.x, location.y);
    this.getStations();
  }

  onMyLocation() {
    this.getLocation();
  }

  onActivateGeolocation() {
    const dialogRef = this.dialog.open(EnableGeolocationDialogComponent);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setCoordinates(position.coords.longitude, position.coords.latitude);
      this.userCoordinates = {
        x: position.coords.longitude,
        y: position.coords.latitude
      };
      this.getStations();
    }, error => {
      if (error.code === 1) {
        console.warn('Geolocation is denied by user.');
        this.geolocationDenied = true;
        this.getStations();
      }
    });
  }

  ngOnInit() {
    this.loading = true;
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.windowHeight = window.innerHeight;
    });
    this.route.queryParams.forEach(next => {
      if (next.x && next.y) {
        this.setCoordinates(+next.x, +next.y);
        this.getStations();
      } else {
        if (navigator.geolocation) {
          this.getLocation();
        } else {
          console.warn('Geolocation is not supported by this browser.');
          this.getStations();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
    if (this.map.event) {
      this.map.event.removeListener(this.dragEventListener);
    }
  }

  getStations() {
    this.error = null;
    this.stationsService.getStations(this.coordinates.x, this.coordinates.y)
      .subscribe(
        (data: any) => {
          this.stations = [];
          data.stations.map((station: any) => {
            const newStation: Station = {
              name: station.name,
              id: station.id,
              coordinate: {
                type: station.coordinate.type,
                x: station.coordinate.x,
                y: station.coordinate.y
              }
            };
            if (newStation.name && newStation.id) {
              this.stations.push(newStation as Station);
            }
          });
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.error = {
            status: true,
            message: String(error)
          };
        });
  }

}
