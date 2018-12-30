import {Component, ViewChild, Injectable, EventEmitter} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
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
  @ViewChild('sidenav') sidenav: MatSidenav;
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
  close() {
    this.sidenav.close();
  }
  logout() {
    console.log('logout');
    this.close();
    this.authService.logout();
  }
}
