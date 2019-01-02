import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {NavigationService} from '../navigation/navigation.service';
import {Station} from '../board/stations/station';
import {TrainsService} from '../board/trains/trains.service';
import {Subscription} from 'rxjs';
import { Train } from '../board/trains/train';
import {DatabaseService, Favorite} from '../services/database-service.service';

@Component({
  selector: 'app-monitordetail',
  templateUrl: './monitordetail.component.html',
  styleUrls: ['./monitordetail.component.css'],
  providers: [TrainsService, NavigationService]
})
export class MonitordetailComponent implements OnInit {

  isFavorite = false;
  loading = true;

  private _stationId: string;
  private favorites: Favorite[];
  private _userId: string;
  private currentFavorite: any;

  constructor(
    private route: ActivatedRoute, public afAuth: AngularFireAuth, private databaseService: DatabaseService) {
  }

  get stationId(): string {
    return this._stationId;
  }

  onFavorite() {
    this.databaseService.addFavorite(this._stationId, this._userId);
  }
  onUnFavorite() {
    this.databaseService.getFavoriteSnapshot(this._stationId, this._userId).subscribe(favorite => {
      this.databaseService.deleteFavorite(favorite.docs[0].id);
      this.isFavorite = false;
      /* return favorite.map(f => {
        if (f) {
          this.databaseService.deleteFavorite(f.payload.doc.id);
          this.isFavorite = false;
        }
      }); */
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
      this.loading = false;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._stationId = params.id;
    });
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this._userId = user.uid;
        this.getFavorites();
      } else {
        console.error('no user id');
        this.favorites = [];
        this.loading = false;
      }
    });
  }

}
