import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {mergeMap, switchMap, map, tap} from 'rxjs/operators';
import {forkJoin, combineLatest} from 'rxjs';
import {SettingsService} from './settings.service';

export interface Favorite {
  userId: string | null;
  stationId: string | null;
  stationName: string;
  addedAt: number;
  display: number;
  favoritetags: Array<string>;
}

export const Nearest: Favorite = {
  addedAt: 0,
  display: 1,
  stationName: 'Aktueller Standort',
  stationId: null,
  userId: null,
  favoritetags: []
};

export interface History {
  name: string;
  addedAt: number;
  lgn: number;
  lat: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  _db: AngularFirestore;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore, public settings: SettingsService) {
    this._db = db;
  }

  public getFavorites(userId: string) {
    return this._db.collection<Favorite>('users/' + userId + '/favorites').valueChanges();
  }

  public getFavoriteByStationId(userId: string, stationId: number) {
    return this._db.collection<Favorite>('users/' + userId + '/favorites',
      ref => ref.where('stationId', '==', String(stationId)).limit(1)).valueChanges();
  }

  public getShownFavorites(userId: string) {
    return this._db.collection<Favorite>('users/' + userId + '/favorites', ref =>
      ref.where('display', '>', 0).limit(4)
    ).valueChanges();
  }

  public addFavorite(stationId: string, userId: string, stationName: string) {
    const added = new Date();
    this._db.collection<Favorite>('users/' + userId + '/favorites').add({
      userId: userId,
      stationId: stationId,
      stationName: stationName,
      addedAt: added.getTime(),
      display: 0,
      favoritetags: []
    });
  }

  public addNearestFavorite(userId: string) {
    const nearest = Nearest;
    nearest.userId = userId;
    this._db.collection<Favorite>('users/' + userId + '/favorites').add(nearest);
  }

  public changeFavoriteDisplayStatus(docId: string, index: number, favorite: Favorite) {
    this._db.doc(`users/${favorite.userId}/favorites/${docId}`).update({
      userId: favorite.userId,
      stationId: favorite.stationId,
      stationName: favorite.stationName,
      addedAt: favorite.addedAt,
      display: index
    });
  }

  public updateTags(docId: string, usertags: string[], favorite: Favorite) {
    this._db.doc(`users/${favorite.userId}/favorites/${docId}`).update({
      favoritetags: usertags
    });
  }

  public getFavoriteSnapshot(stationId: string, userId: string) {
    return this._db.collection<Favorite>('users/' + userId + '/favorites', ref =>
      ref.where('stationId', '==', stationId)).get();
  }

  public deleteFavorite(docId: string, userId: string) {
    this._db.doc(`users/${userId}/favorites/${docId}`).delete();
  }

  public getUserId(): Observable<any> {
    return this.afAuth.authState;
  }

  public addHistoryItem(name: string, x: number, y: number) {
    this.getUserId().pipe(tap((user) => {
      if (user) {
        const added = new Date();
        this._db.collection<History>('users/' + user.uid + '/history').add({
          name: name,
          lgn: x,
          lat: y,
          addedAt: added.getTime()
        });
      }
    })).subscribe();
  }
  public getHistory(userId: string) {
    return this._db.collection<History>('users/' + userId + '/history').valueChanges();
  }
  public getHistorySnapshot(userId: string) {
    return this._db.collection<Favorite>('users/' + userId + '/history', ).get();
    /* this.getUserId().pipe(tap((user) => {
      if (user) {
        return this._db.collection<Favorite>('users/' + user.uid + '/history', ).get();
      }
    })).subscribe(); */
  }
}
