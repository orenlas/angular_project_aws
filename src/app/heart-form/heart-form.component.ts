import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HeartService } from '../heart.service';
import { DateAdapter } from '@angular/material/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SnsService } from '../sns.service';


@Component({
  selector: 'app-heart-form',
  templateUrl: './heart-form.component.html',
  styleUrls: ['./heart-form.component.css']
})
export class HeartFormComponent implements OnInit {

  //Form Stepper
  patients;
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
  tel;
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

    this.heartService.addPatient(this.name, this.age, this.sex, this.date, this.result).toPromise()
    .then(()=>{
      console.log("success");
      return this.router.navigate(['/patients'])
    })
      
  
  }
sendSms(tel,result){
  let sms;
if(result == 'low risk'){
   sms = 'Hello,After testing, you are found to be at low risk for heart disease.We recommend maintaining a healthy lifestyle and getting tested once every six months.* The opinion is not medical'
}
if(result == 'medium risk'){
  sms = 'Hello, After testing, you are found to be at moderate risk for heart disease.We recommend that you come to the clinic to have a more in-depth examination.* The opinion is not medical'
}
if(result == 'high risk'){
  sms = 'Hello,After testing, you are found to be at high risk for heart disease.Please come to the clinic as soon as possible for a medical examination and treatment.* The opinion is not medical'
}
  this.sns.sms(tel,sms).toPromise().then(()=>{
   return console.log(sms);})
}

  constructor(private sns:SnsService,private router:Router,private heartService: HeartService, private authService:AuthService,
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
    tel: ['', Validators.required],
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
