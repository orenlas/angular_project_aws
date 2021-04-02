import { Patient } from './interfaces/patient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeartService {

  //Model - Prediction

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


  public getPatient(userId) {
    this.patientCollection = this.db.collection(`users/${userId}/patients`);
    return this.patientCollection.snapshotChanges()
  }

  
  deletePatient(userId:string , id:string){
    this.db.doc(`users/${userId}/patients/${id}`).delete();
  }

  addPatient(name:string, userId: string, age: number,
    sex: number,
    date:Date,
    cp: number,
    trestbps: number,
    chol: number,
    fbs: number,
    restecg: number,
    thalach: number,
    exang: number,
    oldpeak: number,
    slope: number,
    ca: number,
    thal: number,
    result: string) {
    const patient: Patient = {
      name: name, age: age, sex: sex, date:date, cp: cp, trestbps: trestbps, chol: chol, fbs: fbs, restecg: restecg
      , thalach: thalach, exang: exang, oldpeak: oldpeak, slope: slope, ca: ca, thal: thal, result: result
    };
    this.userCollection.doc(userId).collection(`patients`).add(patient);

  }

  constructor(private http: HttpClient, private db: AngularFirestore) { }
}
