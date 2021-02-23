import { AdviceService } from './../advice.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Advice } from '../interfaces/advice';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.css']
})
export class AdviceComponent implements OnInit {
  advices;
  advicesData$:Observable<Advice>;
  hasError:Boolean = false;
  errorMessage:string;

  refreshAdvice() {
    window.location.reload();
  }

  constructor(private AdviceService:AdviceService) { }

  ngOnInit(): void {
    this.advicesData$ = this.AdviceService.getAdvice();
    this.advicesData$.subscribe(
      data => {
        this.advices = data;
        console.log(this.advices);
      },
      error => {
        console.log(error.message);
        this.hasError = true;
        this.errorMessage = error.message;
      }
      )
  }

}
