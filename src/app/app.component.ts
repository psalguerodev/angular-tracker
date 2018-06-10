import { LoginService } from './services/login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tracker';

  constructor(
    public _loginService:LoginService
  ){

  }

}
