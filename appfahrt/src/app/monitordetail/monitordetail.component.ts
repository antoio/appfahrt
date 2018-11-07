import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monitordetail',
  templateUrl: './monitordetail.component.html',
  styleUrls: ['./monitordetail.component.css']
})
export class MonitordetailComponent implements OnInit {
  private _stationId: string;

  constructor(private route: ActivatedRoute) { }
  get stationId(): string { return this._stationId; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._stationId = params.id;
    });
  }

}
