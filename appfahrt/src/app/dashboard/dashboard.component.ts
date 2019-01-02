import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../navigation/navigation.service';
import {TrainsService} from '../board/trains/trains.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TrainsService, NavigationService]
})
export class DashboardComponent implements OnInit {
  favorites = [];
  loading = true;

  constructor( ) { }

  ngOnInit() {
    // this.favorites = ['8503312', '8503312'];
    this.loading = false;
  }

}
