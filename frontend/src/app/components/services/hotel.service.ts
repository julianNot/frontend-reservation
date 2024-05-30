import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = `${environment.apiUrl}/hotels`;

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  checkAvailability(location: string, date: string): Observable<any> {
    const params = new HttpParams().set('location', location).set('date', date);
    return this.http.get(`${this.apiUrl}/availability`, { params });
  }

  getTariffs(location: string, season: string, roomType: string, numPeople: number): Observable<any> {
    const params = new HttpParams()
      .set('location', location)
      .set('season', season)
      .set('roomType', roomType)
      .set('numPeople', numPeople.toString());
    return this.http.get(`${this.apiUrl}/tariffs`, { params })
      .pipe(
        catchError(err => {
          console.error('Error fetching tariffs', err);
          return throwError(err);
        })
      );
  }
}
