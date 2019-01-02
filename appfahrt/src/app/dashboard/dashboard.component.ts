import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../navigation/navigation.service';
import {TrainsService} from '../board/trains/trains.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {DatabaseService, Favorite} from '../services/database-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [TrainsService, NavigationService]
})
export class DashboardComponent implements OnInit {
  private favorites: Favorite[] = [];
  loading = true;

  constructor( private route: ActivatedRoute, public afAuth: AngularFireAuth, private databaseService: DatabaseService ) { }

  ngOnInit() {
    // this.favorites = ['8503312', '8503312'];
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.databaseService.getFavorites(user.uid).subscribe(favorites => {
          this.favorites = favorites;
        });
      } else {
        console.error('no user id');
        this.favorites = [];
      }
    });
    this.loading = false;
  }

}
