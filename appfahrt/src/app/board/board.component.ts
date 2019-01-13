import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {getTimeDifferenceFromTimestamp, getTimeFromTimestamp} from '../helpers/dateFormat';
import {AppError} from '../other/error/error.component';
import {SettingsService} from '../services/settings.service';
import {Station} from './stations/station';
import {StationsService} from './stations/stations.service';
import {Train} from './trains/train';
import {GetTrainLabel, GetTrainType} from './trains/train-type/trainTape';
import {TrainsService} from './trains/trains.service';

export interface Board {
  station: Station;
  trains: Train[];
}

interface TrainCellItem {
  label: string;
  classes: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [StationsService]
})

export class BoardComponent implements OnInit, AfterViewInit {
  @Input() stationId: string;
  @Input() board: Board;
  loading = true;
  displayTable: TrainCellItem[] = [];
  nearestStationsIds: string[] = [];
  currentStationIndex = 0;
  error: AppError = null;
  fontSize = 18;
  relativeWidth = 1024;
  relativeHeight = 768;
  fit = false;

  headerRow: TrainCellItem[] = [
    {label: 'Ab', classes: 'header center'},
    {label: '', classes: 'header'},
    {label: 'Nach', classes: 'header pl1'},
    {label: 'Gleis', classes: 'header center'}
  ];

  constructor(private trainsService: TrainsService, private stationService: StationsService,
              private settings: SettingsService,
              private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.WebPortrait,
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.relativeWidth = 768;
        this.relativeHeight = 1024;
        return;
      } else {
        this.relativeWidth = 1200;
        this.relativeHeight = 768;
      }
    });
  }

  public translateItem(index) {
    return `translate(0 ${44 + (index * this.itemHeight) })`;
  }
  get textItemPos() {
    return (this.itemHeight / 2 + (this.fontSize / 2)) - (this.fontSize * 0.2);
  }
  get itemHeight() {
    return (this.relativeHeight - 44) / this.board.trains.length;
  }

  public getTime(timestamp: number): string {
    if (this.settings.showDuration) {
      const d = new Date();
      return getTimeDifferenceFromTimestamp(timestamp - d.getTime());
    } else {
      return getTimeFromTimestamp(timestamp);
    }
  }

  public prevStation() {
    this.currentStationIndex--;
    if (this.currentStationIndex < 0) {
      this.currentStationIndex = this.nearestStationsIds.length - 1;
    }
    this.stationId = this.nearestStationsIds[this.currentStationIndex];
    this.loading = true;
    this.loadBoard();
  }

  public nextStation() {
    this.currentStationIndex++;
    if (this.currentStationIndex > this.nearestStationsIds.length - 1) {
      this.currentStationIndex = 0;
    }
    this.stationId = this.nearestStationsIds[this.currentStationIndex];
    this.loading = true;
    this.loadBoard();
  }

  public ngOnInit() {
    this.error = null;
    this.loading = true;
    console.log(this.settings.fit);
    this.fit = this.settings.fit;
    if (this.board === undefined) {
      // Load nearest Station
      if (this.stationId === null) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            x: position.coords.longitude,
            y: position.coords.latitude
          };
          this.getNearestStation(pos);
        }, error => {
          if (error.code === 1) {
            console.warn('Geolocation is denied by user.');
            this.error = {
              status: true,
              message: 'Geolocation ist deaktiviert. Diese kann in den Browsereinstellungen aktiviert werden.'
            };
            this.loading = false;
          }
        });
      } else {
        // Load Bord via ID
        this.loadBoard();
      }
    } else {
      // Board already loaded
      this.displayTable = [...this.headerRow, ...this.fillCellsWithTrains(this.board.trains)];
      this.loading = false;
    }
  }

  private loadBoard() {
    this.trainsService.getTrains(this.stationId).subscribe((data: any) => {
      const newBoard: Board = {station: null, trains: null};
      newBoard.station = data.station as Station;
      newBoard.trains = data.stationboard as Train[];
      this.board = newBoard;
      this.fontSize = Math.min(this.itemHeight - 20, 30);
      this.displayTable = [...this.headerRow, ...this.fillCellsWithTrains(this.board.trains)];
      this.loading = false;
      this.error = null;
    }, (error) => {
      this.error = {
        status: true,
        message: String(error)
      };
      this.loading = false;
    });
  }

  private getNearestStation(pos: { x: number, y: number }) {
    this.stationService.getStations(pos.x, pos.y).subscribe(
      (data: any) => {
        this.nearestStationsIds = [];
        data.stations.map((station: any) => {
          if (station.id) {
            this.nearestStationsIds.push(station.id);
          }
        });
        this.stationId = this.nearestStationsIds[this.currentStationIndex];
        this.error = null;
        this.loadBoard();
      },
      (error) => {
        this.error = {
          status: true,
          message: String(error)
        };
        this.loading = false;
      }
    );
  }
  public trainLabel(train) {
    return GetTrainLabel(train.category, train.number);
  }
  private fillCellsWithTrains(trains: Train[]): TrainCellItem[] {
    const trainList: TrainCellItem[] = [];
    trains.forEach((train) => {
      trainList.push({label: this.getTime(train.stop.departureTimestamp * 1000), classes: 'cell center'});
      trainList.push({
        label: `${GetTrainLabel(train.category, train.number || '')}`,
        classes: `cell train-type ${GetTrainType(train.category, train.operator)}`
      });
      trainList.push({label: train.to, classes: 'cell pl1'});
      trainList.push({label: train.stop.platform, classes: 'cell center'});
    });
    return trainList;
  }

  ngAfterViewInit(): void {

  }
}
