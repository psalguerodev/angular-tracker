import { LoginService } from './../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any = {register:'',password:'',remember:false}
  public loading:boolean = false 


  constructor(
    public _loginService : LoginService,
    public _router: Router
  ) { }

  ngOnInit() {
  }

  loginForm(valueform){
    this.loading = true
    valueform['register'] = valueform['register'].toUpperCase()
    this._loginService.login(valueform).then(data=>{
      this.loading = false
      this._router.navigate(['component'])
    }).catch(err => {
      console.log(err)
      this.loading =false
    })
  }

}
