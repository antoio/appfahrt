import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {LoadableComponent} from '../helpers/loadable';
import {NavigationService} from '../navigation/navigation.service';
import {TrainsService} from '../board/trains/trains.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthServiceService} from '../services/auth-service.service';
import {DatabaseService, Favorite, Nearest} from '../services/database-service.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TrainsService, NavigationService]
})
export class DashboardComponent extends LoadableComponent implements OnInit {
  favorites: Favorite[] = [];
  smallSize = false;
  maxDashboards = 4;
  getDashboardStyle() {
    const maxBoards = Math.min(this.favorites.length, this.maxDashboards);
    let height = 100;
    let width = 100;
    let toolbarOffset = 84 + (this.smallSize ? 64 : 0);
    if (maxBoards > 1 && !this.smallSize) {
      height = 100;
      width = 50;
    }
    if (maxBoards > 2 && !this.smallSize) {
      height = 50;
      width = 50;
      toolbarOffset = 114 / 2;
    }
    return {
      height: `calc(${height}vh - ${toolbarOffset}px)`,
      minWidth: `calc(${width}% - 20px)`,
      width: `calc(${width}% - 20px)`,
      flex: `1 1 calc(${width}% - 20px)`,
      boxSizing: 'border-box'
    };
  }

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private databaseService: DatabaseService,
    private settings: SettingsService,
    private breakpointObserver: BreakpointObserver) {
    super();
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
    this.loading = true;
    this.error = null;
    this.authService.userIsSigenedIn().pipe(
      tap(user => {
        if (user) {
          this.databaseService.getShownFavorites(user.uid).subscribe(favorites => {
            if (favorites.length > this.maxDashboards) {
              this.favorites = favorites.slice(0, this.maxDashboards);
              console.debug(`dashboard.component.ts => this.favorites: ${this.favorites}`);
            } else {
              this.favorites = favorites;
              console.debug(`dashboard.component.ts => this.favorites: ${this.favorites}`);
            }
            this.loading = false;
          });
        } else {
          this.favorites = [Nearest];
          this.loading = false;
        }
      })
    ).subscribe(() => console.log('success'), (error) => {
      this.error = {
        status: 1,
        message: 'Konnte keine Verbindung herstellen'
      };
    });
  }
}
