import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public user:any = {}
  public message:string = ''

  public userpass:any = {}
  public passmessage:string = ''
  
  constructor(
    public _loginService:LoginService,
    public _userSerice:UserService
  ) { }

  ngOnInit() {
    this.user = this._loginService.getUser()
  }

  processForm(formvalue){
    formvalue['active'] = 1
    formvalue['code'] = this.user['code']
    this._userSerice.updateUser(formvalue).subscribe(res => {
      this.message = 'Actualizado'
    },err => {
      console.log(err);
    })
  }

  processFormPass(formvalue){
    console.log(formvalue)
    formvalue['code'] = this.user['code']
    this._userSerice.changePassword(formvalue).subscribe(res=>{
      this.passmessage = 'Clave actualizada'
      this.userpass = {}
      console.log(res)
    },err=>{
      console.log(err)
    })
  }

}
