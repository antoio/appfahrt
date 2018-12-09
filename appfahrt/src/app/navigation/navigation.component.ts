import {Component, OnInit, Injectable, EventEmitter} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NavigationService} from './navigation.service';
import {Title} from '@angular/platform-browser';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [NavigationService]
})
export class NavigationComponent {
  title = 'Appfahrt';
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.title = activatedRoute.snapshot.firstChild.data.title;
        titleService.setTitle('Appfahrt - ' + this.title);
      }
    });

  }

  logout() {
    console.log("logout");
    this.authService.logout();
  }
  
}
