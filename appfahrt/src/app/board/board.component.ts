import {Component, Input, OnInit} from '@angular/core';
import {getTimeFromTimestamp} from '../helpers/dateFormat';
import {Station} from './stations/station';
import {Train} from './trains/train';
import {TrainsService} from './trains/trains.service';

export interface Board {
  station: Station;
  trains: Train[];
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  @Input() stationId: string;
  @Input() board: Board;
  displayedColumns: string[] = ['name', 'time', 'destination', 'track'];
  loading = true;

  constructor(private trainsService: TrainsService) { }
  public getTime(date: number): string {
    return getTimeFromTimestamp(date);
  }
  ngOnInit() {
    if (this.board === undefined && this.stationId) {
      // Load Bord via ID
      this.trainsService.getTrains(this.stationId).subscribe((data: any) => {
        const newBoard: Board = {station: null, trains: null};
        newBoard.station = data.station as Station;
        newBoard.trains = data.stationboard as Train[];
        this.board = newBoard;
        this.loading = false;
      });
    } else {
      // Board already loaded
      this.loading = false;
    }
  }
}