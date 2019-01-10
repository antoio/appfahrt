import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../navigation/navigation.service';
import {TrainsService} from '../board/trains/trains.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DatabaseService, Favorite, Nearest} from '../services/database-service.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TrainsService, NavigationService]
})
export class DashboardComponent implements OnInit {
  private favorites: Favorite[] = [];
  loading = true;
  smallSize = false;

  getDashboardStyle() {
    const maxBoards = this.settings.maxDashboards;
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
    public afAuth: AngularFireAuth,
    private databaseService: DatabaseService,
    private settings: SettingsService,
    private breakpointObserver: BreakpointObserver) {
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
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.databaseService.getShownFavorites(user.uid).subscribe(favorites => {
          this.favorites = favorites;
        });
      } else {
        console.error('no user id');
        this.favorites = [Nearest];
      }
    });
    this.loading = false;
  }

}
