import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdviceComponent } from './advice/advice.component';
import { CovidComponent } from './covid/covid.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'covid', component: CovidComponent },
  { path: 'advice', component: AdviceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
