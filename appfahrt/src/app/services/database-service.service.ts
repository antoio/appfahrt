import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { forkJoin, combineLatest } from 'rxjs';
import {Settings} from '../usersettings/usersettings.component';

export interface Favorite { userId: string; stationId: string; addedAt: number; }
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  _db: AngularFirestore;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this._db = db;
  }
  public getFavorites(userId: string) {
    return this._db.collection<Favorite>('favorites', ref => ref.where('userId', '==', userId)).valueChanges();
  }
  public addFavorite(stationId: string, userId: string) {
    const added = new Date();
    this._db.collection<Favorite>('favorites').add({ userId: userId, stationId: stationId, addedAt: added.getTime() });
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

  /////////////////////
  // Settings
  ////////////////////
  public addSettings(userId: string, settings: Settings) {
    this._db.collection<Settings>('settings').add(settings);
  }

  public getSettings(userId: string) {
    //FIXME: to implement
    return this._db.collection<Settings>('settings', ref => ref.where('userId', '==', userId)).valueChanges();
  }

  public updateSettings(userId: string) {
    //FIXME: to implement
    this._db.collection<Favorite>('favorites').add({ userId: userId, stationId: stationId, addedAt: added.getTime() });
  }
}
