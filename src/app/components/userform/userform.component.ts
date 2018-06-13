import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user/user.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styles: []
})
export class UserformComponent implements OnInit {

  public user:any = {}

  constructor(
    public _userService:UserService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  processForm(formvalue){
    console.log(formvalue)
    formvalue['password'] = 'tracker'
    this._userService.addUser(formvalue).subscribe(data=>{
      console.log(data)
      this.router.navigate(['user'])
    },err=>{
      console.log(err)
    })
  }

  cancelBtn(){
    this.router.navigate(['user'])
  }

}
