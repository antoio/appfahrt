import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { forkJoin, combineLatest } from 'rxjs';

export interface Favorite { userId: string; stationId: string; addedAt: number }
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
    console.log('add', stationId, userId);
    this._db.collection<Favorite>('favorites').add({ userId: userId, stationId: stationId, addedAt: added.getTime() });
  }
  public getFavoriteSnapshot(stationId: string, userId: string) {
    console.log('snapshot');
    return this._db.collection<Favorite>('favorites', ref => ref
      .where('userId', '==', userId)
      .where('stationId', '==', stationId)).get();
  }
  public deleteFavorite(docId: string) {
    console.log('delete', docId);
    this._db.doc(`favorites/${docId}`).delete();
  }
  private getUserId(): Observable<any> {
    return this.afAuth.authState;
  }
}
