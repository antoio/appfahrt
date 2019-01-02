import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../navigation/navigation.service';
import {Station} from '../board/stations/station';
import {TrainsService} from '../board/trains/trains.service';
import {Subscription} from 'rxjs';
import { Train } from '../board/trains/train';

@Component({
  selector: 'app-monitordetail',
  templateUrl: './monitordetail.component.html',
  styleUrls: ['./monitordetail.component.css'],
  providers: [TrainsService, NavigationService]
})
export class MonitordetailComponent implements OnInit {

  private _stationId: string;

  constructor(
    private route: ActivatedRoute) {

  }

  get stationId(): string {
    return this._stationId;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._stationId = params.id;
    });
  }

}
