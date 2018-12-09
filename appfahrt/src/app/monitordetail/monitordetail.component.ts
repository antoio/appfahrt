import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../navigation/navigation.service';
import {Station} from '../stations/station';
import {OBERGLATT} from '../trains/stations';
import {TrainsService} from '../trains/trains.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-monitordetail',
  templateUrl: './monitordetail.component.html',
  styleUrls: ['./monitordetail.component.css'],
  providers: [TrainsService, NavigationService]
})
export class MonitordetailComponent implements OnInit {

  station: Station = null;
  trains: any = null;

  private _stationId: string;

  constructor(
    private route: ActivatedRoute,
    private trainsService: TrainsService,
    private navigationService: NavigationService) {

  }

  get stationId(): string {
    return this._stationId;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._stationId = params.id;
    });

    this.trainsService.getTrains(this.stationId).subscribe((data: any) => {
      this.station = data.station;
      this.trains = data.stationboard;
    });
  }

}
