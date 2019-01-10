import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, ViewChild, Injectable, EventEmitter} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {config} from '../config';
import {SettingsService} from '../services/settings.service';
import {NavigationService} from './navigation.service';
import {Title} from '@angular/platform-browser';
import { AuthServiceService } from '../services/auth-service.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [NavigationService]
})
export class NavigationComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'Appfahrt';
  bottomNav = '';
  smallSize = false;
  appVersion = config.appVersion;
  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private breakpointObserver: BreakpointObserver) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.title = activatedRoute.snapshot.firstChild.data.title;
        this.bottomNav = activatedRoute.snapshot.firstChild.data.bottomNav;
        titleService.setTitle('Appfahrt - ' + this.title);
      }
    });
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
  onUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.sidenav.open();
      } else {
        this.router.navigate(['/login']);
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
