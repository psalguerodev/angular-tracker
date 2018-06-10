import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public user:any = {}

  constructor(
    public _loginService:LoginService
  ) { }

  ngOnInit() {
    this.user = this._loginService.getUser()
  }

}
