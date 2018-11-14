import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Station} from '../stations/station';
import {TrainsService} from '../trains/trains.service';

@Component({
  selector: 'app-monitordetail',
  templateUrl: './monitordetail.component.html',
  styleUrls: ['./monitordetail.component.css'],
  providers: [ TrainsService ]
})
export class MonitordetailComponent implements OnInit {

  station: Station = null;
  trains: any = null;
  private _stationId: string;


  constructor(
    private route: ActivatedRoute,
    private trainsService: TrainsService) { }

  get stationId(): string { return this._stationId; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._stationId = params.id;
    });

    this.trainsService.getTrains(this.stationId).subscribe((data: any) => {
      this.station = data.station;
      this.trains = data.stationboard;
      console.log(this.station, this.trains);
    });
  }

}
