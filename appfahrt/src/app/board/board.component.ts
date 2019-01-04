import {Component, Input, OnInit} from '@angular/core';
import {getTimeDifferenceFromTimestamp, getTimeFromTimestamp} from '../helpers/dateFormat';
import {SettingsService} from '../services/settings.service';
import {Station} from './stations/station';
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
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  @Input() stationId: string;
  @Input() board: Board;
  loading = true;
  displayTable: TrainCellItem[] = [];

  constructor(private trainsService: TrainsService, private settings: SettingsService) { }
  public getTime(timestamp: number): string {
    if (this.settings.showDuration) {
      const d = new Date();
      return getTimeDifferenceFromTimestamp(timestamp - d.getTime());
    } else {
      return getTimeFromTimestamp(timestamp);
    }
  }
  ngOnInit() {
    const headerRow: TrainCellItem[]  = [
      {label: 'Time', classes: 'header center'},
      {label: '', classes: 'header'},
      {label: 'Destination', classes: 'header pl1'},
      {label: 'Platform', classes: 'header center'}
    ];
    if (this.board === undefined && this.stationId) {
      // Load Bord via ID
      this.trainsService.getTrains(this.stationId).subscribe((data: any) => {
        const newBoard: Board = {station: null, trains: null};
        newBoard.station = data.station as Station;
        newBoard.trains = data.stationboard as Train[];
        this.board = newBoard;
        this.displayTable = [ ...headerRow, ...this.fillCellsWithTrains(this.board.trains)];
        this.loading = false;
      });
    } else {
      // Board already loaded
      this.displayTable = [ ...headerRow, ...this.fillCellsWithTrains(this.board.trains)];
      this.loading = false;
    }
  }

  private fillCellsWithTrains( trains: Train[]): TrainCellItem[] {
    const trainList: TrainCellItem[] = [];
    trains.forEach((train) => {
      trainList.push({label: this.getTime(train.stop.departureTimestamp * 1000), classes: 'cell center'});
      trainList.push({label: `${GetTrainLabel(train.name)}`, classes: `cell train-type ${GetTrainType(train.category)}`});
      trainList.push({label: train.to, classes: 'cell pl1'});
      trainList.push({label: train.stop.platform, classes: 'cell center'});
    });
    return trainList;
  }
}
