import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  email:string;
  userId:string;

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(
      user => {
        this.userId = user.uid;
        this.email = user.email;
       }
    )
  }

}
