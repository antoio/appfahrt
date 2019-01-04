import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {SettingsService} from '../../services/settings.service';

@Injectable()
export class TrainsService {
  url = 'http://transport.opendata.ch/v1/';

  constructor(private http: HttpClient, private settings: SettingsService) {
  }

  getTrains(stationId: string = '8503110') {
    return this.http.get(this.url + `stationboard?station=${stationId}&limit=${this.settings.stationCount}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
