import { Component, OnInit } from '@angular/core';
import {NavigationService} from './navigation/navigation.service';
import {TrainsService} from './board/trains/trains.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ NavigationService ]
})
export class AppComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.init();
  }
}
