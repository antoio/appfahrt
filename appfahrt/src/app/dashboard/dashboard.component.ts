import { Component, OnInit } from '@angular/core';
import {getTimeFromTimestamp} from '../helpers/dateFormat';
import {NavigationService} from '../navigation/navigation.service';
import {Station} from '../stations/station';
import {Train} from '../trains/train';
import {TrainsService} from '../trains/trains.service';


interface Board {
  station: Station;
  trains: Train[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TrainsService, NavigationService]
})
export class DashboardComponent implements OnInit {
  favorites = ['8503110', '8503110', '8503110', '8503110'];
  boards: Board[] = [];
  displayedColumns: string[] = ['name', 'time', 'destination', 'track'];

  constructor( private trainsService: TrainsService ) { }

  public getTime(date: number): string {
    return getTimeFromTimestamp(date);
  }

  ngOnInit() {
    this.favorites.map((stationId) => {
      this.trainsService.getTrains(stationId).subscribe((data: any) => {
        const newBoard: Board = { station: null, trains: null};
        newBoard.station = data.station as Station;
        newBoard.trains = data.stationboard as Train[];
        this.boards.push(newBoard);
      });
    });
  }

}
