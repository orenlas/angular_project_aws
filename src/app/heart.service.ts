import { Patient } from './interfaces/patient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeartService {

  //Model - Prediction
private Api = " https://jywsex8un3.execute-api.us-east-1.amazonaws.com/beta";
  private url = "https://y7nxf4xbgh.execute-api.us-east-1.amazonaws.com/beta";

  predict(data
  ): Observable<any> {
    let json = {
      "data":
        data
    }

    let Body = JSON.stringify(json); //text to input in internet
    console.log("in predict");
    Body = Body.replace('[', '"')
    Body = Body.replace(']', '"')
    console.log(Body);
    return this.http.post<any>(this.url, Body).pipe(
      map(res => {
        console.log(res);
        let final = res[0];
        return final
      })
    )
  }

  //Functions
  userCollection: AngularFirestoreCollection = this.db.collection('users');
  patientCollection: AngularFirestoreCollection;


  public getPatient() {
    return this.http.get<any>(this.Api).pipe(
      map(res => {
        console.log(res);
        let final = res[0];
        return res.Items
      })
    
    )}

  
  deletePatient(name){
   return this.http.delete(`${this.Api}/${name}`).pipe(
    map(res => {
      console.log(res);
    })
  
  )
  }

  addPatient(name:string, age: number,
    sex: number,
    date:Date,
    result: string) {
      let json = {   "name": name,
      "age": age,
      "sex":sex,
      "date":date,
      "result":result
  }
  let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  let options = { headers: headers };
    const patient: Patient = {
      name: name, age: age, sex: sex, date:date, result: result
    };
    return this.http.post<any>(this.Api,json,options).pipe(
      map(res => {
        console.log(res);
      })
    
    );
    

  }

  constructor(private http: HttpClient, private db: AngularFirestore) { }
}
