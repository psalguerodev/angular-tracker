import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {


  constructor(
    public _loginService:LoginService
  ) { }

  ngOnInit() {
  }

  onclickMenu() {
    $("#btnToggle").click()
  }

  logout(){
    this._loginService.logout()
  }

}
