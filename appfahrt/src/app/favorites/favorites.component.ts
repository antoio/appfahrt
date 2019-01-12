import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AppError} from '../other/error/error.component';
import {DatabaseService, Favorite} from '../services/database-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  private favorites: Favorite[] = [];
  loading = true;
  error: AppError = null;

  constructor( private route: ActivatedRoute, public afAuth: AngularFireAuth, private databaseService: DatabaseService ) { }

  ngOnInit() {
    this.favorites = [];
    this.error = null;
      this.afAuth.authState.subscribe(user => {
      if (user) {
        this.databaseService.getFavorites(user.uid).subscribe(favorites => {
          this.favorites = favorites;
          this.error = null;
          this.loading = false;
        });
      } else {
        this.loading = false;
        this.error = {
          status: true,
          message: 'Favoriten konnten nicht geladen werden'
        };
        console.error('no user id');
      }
    });
  }
}
