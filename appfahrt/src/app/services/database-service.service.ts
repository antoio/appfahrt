import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { forkJoin, combineLatest } from 'rxjs';

export interface Favorite { userId: string; stationId: string; stationName: string; addedAt: number; }
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
  public addFavorite(stationId: string, userId: string, stationName: string) {
    const added = new Date();
    this._db.collection<Favorite>('favorites').add({
      userId: userId,
      stationId: stationId,
      stationName: stationName,
      addedAt: added.getTime()
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
