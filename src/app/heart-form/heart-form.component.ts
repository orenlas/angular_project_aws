import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HeartService } from '../heart.service';
import { DateAdapter } from '@angular/material/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-heart-form',
  templateUrl: './heart-form.component.html',
  styleUrls: ['./heart-form.component.css']
})
export class HeartFormComponent implements OnInit {

  //Form Stepper
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //
  name:string;
  age:number;
  sex:number; 
  date:Date;
  cp:number; 
  trestbps:number; 
  chol:number; 
  fbs:number; 
  restecg:number;
  thalach:number;	
  exang:number;	
  oldpeak:number;	
  slope:number;	
  ca:number; 
  thal:number;
  result:string;
  userId;
 data=[];
  predict(){
    this.data =  [this.age, this.sex, this.cp, this.trestbps, this.chol, this.fbs, this.restecg
    	,this.thalach, this.exang,	this.oldpeak,	this.slope,	this.ca, this.thal]
    this.heartService.predict(this.data).subscribe(
      res => {
        console.log(res);
        this.result = res}
    )
  }
  
  addPatient(){
    this.heartService.addPatient(this.name, this.userId, this.age, this.sex, this.date, this.cp, this.trestbps, this.chol, this.fbs, this.restecg
    	,this.thalach, this.exang,	this.oldpeak,	this.slope,	this.ca, this.thal, this.result)
    return this.router.navigate(['/patients'])
  }


  constructor(private router:Router,private heartService: HeartService, private authService:AuthService,
     private dateAdapter: DateAdapter<Date>, private _formBuilder: FormBuilder) { 
    this.dateAdapter.setLocale('en-IL');
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user =>{
        this.userId = user.uid;
  })
  this.firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    sex: ['', Validators.required],
    date: ['', Validators.required]
  });
  this.secondFormGroup = this._formBuilder.group({
    cp: ['', Validators.required],
    trestbps: ['', Validators.required],
    chol: ['', Validators.required],
    fbs: ['', Validators.required],
    restecg: ['', Validators.required],
    thalach: ['', Validators.required],
    exang: ['', Validators.required],
    oldpeak: ['', Validators.required],
    slope: ['', Validators.required],
    ca: ['', Validators.required],
    thal: ['', Validators.required]
  });


}
}
