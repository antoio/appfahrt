import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {tap} from 'rxjs/operators';
import {Board} from '../board/board.component';
import {NavigationService} from '../navigation/navigation.service';
import {Station} from '../board/stations/station';
import {TrainsService} from '../board/trains/trains.service';
import {Subscription} from 'rxjs';
import { Train } from '../board/trains/train';
import {AuthServiceService} from '../services/auth-service.service';
import {DatabaseService, Favorite} from '../services/database-service.service';

@Component({
  selector: 'app-monitordetail',
  templateUrl: './monitordetail.component.html',
  styleUrls: ['./monitordetail.component.css'],
  providers: [TrainsService, NavigationService]
})
export class MonitordetailComponent implements OnInit {

  isFavorite = false;
  loading = {
    favorites: true,
    stationBoard: true
  };

  private _stationId: string;
  private favorites: Favorite[];
  private _userId: string;
  get userId() {
    return this._userId;
  }
  private board: Board;
  smallSize = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private databaseService: DatabaseService,
    private trainsService: TrainsService,
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

  get stationId(): string {
    return this._stationId;
  }

  onFavorite() {
    this.databaseService.addFavorite(String(this.board.station.id), this._userId, this.board.station.name);
  }
  onUnFavorite() {
    this.databaseService.getFavoriteSnapshot(this._stationId, this._userId).subscribe(favorite => {
      this.databaseService.deleteFavorite(favorite.docs[0].id);
      this.isFavorite = false;
    });
  }

  getFavorites() {
    this.databaseService.getFavorites(this._userId).subscribe(favorites => {
      this.favorites = favorites;
      this.favorites.map( favorite => {
        if (favorite.stationId === this._stationId) {
          this.isFavorite = true;
        }
      });
      this.loading.favorites = false;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if ( params.id === 'nearest') {
        this.loading.stationBoard = false;
        this.loading.favorites = false;
        this.board = undefined;
        this._stationId = null;
        return;
      }
      this._stationId = params.id;
      this.trainsService.getTrains(this._stationId).subscribe((data: any) => {
        const newBoard: Board = {station: null, trains: null};
        newBoard.station = data.station as Station;
        newBoard.trains = data.stationboard as Train[];
        this.board = newBoard;
        this.loading.stationBoard = false;
      });
    });
    this.authService.userIsSigenedIn().pipe(
      tap(user => {
        if (user) {
          this._userId = user.uid;
          this.getFavorites();
        } else {
          this.favorites = [];
          this.loading.favorites = false;
        }
      })
    ).subscribe();
  }

}
