import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email:string;
  password:string;
  errorMessage:string;
  isError:boolean = false;

  onSubmit(){
    this.authService.signUp(this.email,this.password)
    .then(res => {
      console.log(res);
      this.router.navigate(['/welcome'])   
      })
      .catch(error => {
        console.log(error);
        this.isError = true;
        this.errorMessage = error.message;
      }) 
  }

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

}
