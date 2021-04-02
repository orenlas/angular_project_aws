import { Patient } from './../interfaces/patient';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HeartService } from '../heart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients$;
  patients: Patient[];
  userId: string;

  sexDict = {0:'Female',1:'Male'};

  /* displayedColumns: string[] = ['name','age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg'
    , 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'Delete']; */

  displayedColumns: string[] = ['name','age', 'sex','date', 'result', 'delete'];


  deletePatient(index) {
    let id = this.patients[index].id;
    this.heartService.deletePatient(this.userId, id);
  }

  redirect() {
    this.router.navigate(['/heartForm']);
  }


  constructor(private router:Router, private heartService: HeartService, public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.userId = user.uid;
        console.log(this.userId);
        this.patients$ = this.heartService.getPatient(this.userId);
        this.patients$.subscribe(
          docs => {
            console.log(docs);
            this.patients = [];
            var i = 0;
            for (let document of docs) {
              console.log(i++);
              const patient: Patient = document.payload.doc.data();
              patient.id = document.payload.doc.id;
              this.patients.push(patient);
            }
          }
        )
      }
    )
  }

}
