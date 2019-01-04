import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {DatabaseService, Favorite} from '../services/database-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  private favorites: Favorite[] = [];
  private loading = true;

  constructor( private route: ActivatedRoute, public afAuth: AngularFireAuth, private databaseService: DatabaseService ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.databaseService.getFavorites(user.uid).subscribe(favorites => {
          this.favorites = favorites;
          this.loading = false;
        });
      } else {
        console.error('no user id');
        this.favorites = [];
      }
    });
  }

}
