import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import {config} from '../../config';

@Injectable()
export class StationsService {
  url = config.opentransURL;
  constructor(private http: HttpClient) { }

  getStations(x: number = 8.522655, y: number = 47.386688) {
    return this.http.get(this.url + `locations?x=${x}&y=${y}&limit=10`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Fehler beim laden der Stations-Daten. Bitte versuchen Sie es später nochmals.');
  }
}
