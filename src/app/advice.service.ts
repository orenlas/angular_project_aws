import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Advice } from './interfaces/advice';

@Injectable({
  providedIn: 'root'
})
export class AdviceService {
  private URL = "	https://api.adviceslip.com/advice";

  constructor(private http:HttpClient) { }

  getAdvice():Observable<Advice>{
    return this.http.get<Advice>(`${this.URL}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(res:HttpErrorResponse){
    console.log(res.error);
    return throwError(res.error || 'Server Error');
  }
}

