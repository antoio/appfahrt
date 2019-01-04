import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { forkJoin, combineLatest } from 'rxjs';
import {SettingsService} from './settings.service';

export interface Favorite {
  userId: string;
  stationId: string;
  stationName: string;
  addedAt: number;
  display: number;
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
    return this._db.collection<Favorite>('favorites', ref => ref.where('userId', '==', userId)).valueChanges();
  }
  public getShownFavorites(userId: string) {
    return this._db.collection<Favorite>('favorites', ref =>
      ref.where('userId', '==', userId).where('display', '>', 0).limit(this.settings.maxDashboards)
    ).valueChanges();
  }
  public addFavorite(stationId: string, userId: string, stationName: string) {
    const added = new Date();
    this._db.collection<Favorite>('favorites').add({
      userId: userId,
      stationId: stationId,
      stationName: stationName,
      addedAt: added.getTime(),
      display: 0
    });
  }
  public changeFavoriteDisplayStatus(docId: string, index: number, favorite: Favorite) {
    this._db.doc(`favorites/${docId}`).update({
      userId: favorite.userId,
      stationId: favorite.stationId,
      stationName: favorite.stationName,
      addedAt: favorite.addedAt,
      display: index
    });
  }
  public getFavoriteSnapshot(stationId: string, userId: string) {
    return this._db.collection<Favorite>('favorites', ref => ref
      .where('userId', '==', userId)
      .where('stationId', '==', stationId)).get();
  }
  public deleteFavorite(docId: string) {
    this._db.doc(`favorites/${docId}`).delete();
  }
  private getUserId(): Observable<any> {
    return this.afAuth.authState;
  }
}
