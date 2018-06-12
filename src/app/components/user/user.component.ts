import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  public users:any = []

  constructor(
    public _userService:UserService
  ) { }

  ngOnInit() {
    this.listUser()
  }

  processForm(formvalue) {
    console.log(formvalue);
    
  }

  listUser(){
    this._userService.listAllUsers().subscribe(data=>{
      console.log(data)
      this.users = data['body']
    },err=> {
      console.log(err)
    })
  }

  deleteUser(user){
    if(confirm(`¿Está seguro de eliminar a ${user['name']}?`)){
      this._userService.deleteUser(user).subscribe(data=>{
        console.log(data)
        this.listUser()
      },err=>{
        console.log(err)
      })
    }
  }

}
