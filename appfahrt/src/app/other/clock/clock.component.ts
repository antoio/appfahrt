import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import {TimeInterval} from 'rxjs';

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

  get secTransform() {
    return `rotate(${this.secDeg}, 256, 256)`;
  }
  get minTransform() {
    return `rotate(${this.minDeg}, 256, 256)`;
  }
  get hourTransform() {
    return `rotate(${this.hourDeg}, 256, 256)`;
  }

  constructor() { }

  ngOnInit() {
    this.interval = setInterval(() => {
      const time = new Date();
      this.secDeg = time.getSeconds() * 6;
      this.minDeg = time.getMinutes() * 6;
      this.hourDeg = (time.getHours() % 12 * 30) + (0.3 * (100 / 360 * this.minDeg));
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
