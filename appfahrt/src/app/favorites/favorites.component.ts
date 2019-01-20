import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {tap} from 'rxjs/operators';
import {LoadableComponent} from '../helpers/loadable';
import {AppError} from '../other/error/error.component';
import {AuthServiceService} from '../services/auth-service.service';
import {DatabaseService, Favorite, Nearest} from '../services/database-service.service';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent extends LoadableComponent implements OnInit {

  private favorites: Favorite[] = [];
  private inactiveFavorites: Favorite[] = [];
  private activeFavorites: Favorite[] = [];
  error: AppError = null;
  favoritesLoading = false;
  noUser = false;

  @Output() favorite: Favorite;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    public afAuth: AngularFireAuth,
    private databaseService: DatabaseService) {
    super();
  }

  drop(event: CdkDragDrop<string[]>) {
    // if (this.favoritesLoading) { return; }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.saveFavorites();
  }

  saveFavorites() {
    this.favoritesLoading = true;
    this.activeFavorites.forEach((f, index) => {
      this.databaseService.getFavoriteSnapshot(f.stationId, f.userId).subscribe(favorite => {
        this.databaseService.changeFavoriteDisplayStatus(favorite.docs[0].id, index + 1, f);
      });
    });
    this.inactiveFavorites.forEach((f, index) => {
      this.databaseService.getFavoriteSnapshot(f.stationId, f.userId).subscribe(favorite => {
        this.databaseService.changeFavoriteDisplayStatus(favorite.docs[0].id, 0, f);
      });
    });
  }

  ngOnInit() {
    this.favorites = [];
    this.error = null;
    this.noUser = false;

    this.authService.userIsSigenedIn().pipe(
      tap(user => {
        if (user) {
          this.databaseService.getFavorites(user.uid).subscribe(favorites => {
            this.favorites = favorites;
            this.activeFavorites = new Array<Favorite>(4);
            this.inactiveFavorites = [];
            this.favorites.forEach((f) => {
              if (f.display !== 0) {
                this.activeFavorites[f.display - 1] = f;
              } else {
                this.inactiveFavorites.push(f);
              }
            });
            this.error = null;
            this.loading = false;
          });
        } else {
          this.loading = false;
          this.noUser = true;
        }
      })
    ).subscribe();
  }
}
