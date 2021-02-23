import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private URL = "https://corona.lmao.ninja/v2/countries";

  public getCovidData() {
    return this.http.get(`${this.URL}`).pipe(catchError(this.handleError))
  }

  private handleError(res: HttpErrorResponse) {
    console.log(res.error);
    return throwError(res.error || 'Server Error');
  }

  constructor(private http: HttpClient) { }

}
