import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnsService {
  url = "http://ec2-3-84-158-21.compute-1.amazonaws.com/sms";
  sms(phoneNumber,sms){
    let message = {'message':sms};
    let headers = new HttpHeaders( 'Content-Type: application/json' );
    let options = { headers: headers};
    return this.http.post<any>(`${this.url}/${phoneNumber}`,message,{ responseType: 'text' as 'json' }).pipe(
    map(res=> {
      console.log(res)
    })  
    )
  }

  constructor(private http: HttpClient) { }
}
