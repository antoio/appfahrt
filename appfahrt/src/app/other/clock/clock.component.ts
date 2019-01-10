import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import {TimeInterval} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  _time = new Date();
  secDeg = this._time.getSeconds() * 6;
  minDeg = this._time.getMinutes() * 6;
  hourDeg = (this._time.getHours() % 12 * 30) + (0.3 * (100 / 360 * this.minDeg));
  interval: number;
  type = this.settings.clockType;
  smallSize = false;

  get secTransform() {
    return `rotate(${this.secDeg}, 256, 256)`;
  }
  get minTransform() {
    return `rotate(${this.minDeg}, 256, 256)`;
  }
  get hourTransform() {
    return `rotate(${this.hourDeg}, 256, 256)`;
  }
  getTime() {
    return moment(this._time).format('HH:mm');
  }
  /* onChangeType() {
    if ( this.type === 'digital') {
      this.type = 'analog';
    } else {
      this.type = 'digital';
    }
  } */

  constructor(private settings: SettingsService, private breakpointObserver: BreakpointObserver) {
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

  ngOnInit() {
    this.interval = setInterval(() => {
      this.type = this.settings.clockType;
      const time = new Date();
      this._time = time;
      this.secDeg = time.getSeconds() * 6;
      this.minDeg = time.getMinutes() * 6;
      this.hourDeg = (time.getHours() % 12 * 30) + (0.3 * (100 / 360 * this.minDeg));
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
