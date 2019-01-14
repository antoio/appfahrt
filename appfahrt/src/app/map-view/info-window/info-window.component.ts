import {Component, Input, OnInit} from '@angular/core';
import {Station} from '../../board/stations/station';
import {LoadableComponent} from '../../helpers/loadable';
import {DatabaseService} from '../../services/database-service.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent extends LoadableComponent implements OnInit {
  @Input() station: Station;
  isFavorite = false;
  user = null;
  constructor(
    public afAuth: AngularFireAuth,
    private databaseService: DatabaseService) {
    super();
  }
  onChangeFavorite() {
    if (!this.user) { return; }
    if (this.isFavorite) {
      this.databaseService.getFavoriteSnapshot(String(this.station.id), this.user.uid).subscribe(favorite => {
        this.databaseService.deleteFavorite(favorite.docs[0].id);
        this.isFavorite = false;
      });
    } else {
      this.databaseService.addFavorite(String(this.station.id), this.user.uid, this.station.name);
      this.isFavorite = true;
    }
  }
  ngOnInit() {
    this.user = null;
    this.isFavorite = false;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.databaseService.getFavoriteByStationId(user.uid, this.station.id).subscribe(favorite => {
          if (favorite.length === 1) {
            this.isFavorite = true;
          }
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }
}