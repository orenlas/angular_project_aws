import { Patient } from './../interfaces/patient';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { HeartService } from '../heart.service';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  fileObj: File;
  fileUrl: string;
  errorMsg: boolean;
  title = 's3-file-uploader-app';
  patients$;
  patients: Patient[];
  userId: string;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  sexDict = {0:'Female',1:'Male'};

  /* displayedColumns: string[] = ['name','age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg'
    , 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'Delete']; */

  displayedColumns: string[] = ['name','age', 'sex','date','result', 'delete'];


  deletePatient(name,i) {
   
   return this.heartService.deletePatient(name).toPromise().then(()=>{
    this.patients.splice(i,1);
    this.table.renderRows();
      console.log("success")
      
    });
  }

  redirect() {
    this.router.navigate(['/heartForm']);
  }

  

  constructor(private router:Router, private heartService: HeartService,public authService: AuthService) { 
      this.errorMsg = false;
    }

  ngOnInit(): void {
    this.heartService.getPatient().subscribe(
      res => {
        console.log(res);
        this.patients = res}
    )
  }

}
