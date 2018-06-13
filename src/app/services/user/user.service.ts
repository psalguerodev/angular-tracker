import { CONF } from './../../conf/conf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = `${CONF.ENDPOINT}user`

  constructor(
    public router:Router ,
    public http:HttpClient
  ) { }

  addUser(user){
    return this.http.post(this.url,user)
  }

  updateUser(user){
    console.log(user)
    return this.http.put(`${this.url}/${user['code']}`,user)
  }

  deleteUser(user){
    return this.http.delete(`${this.url}/${user['code']}`)
  }

  listAllUsers(){
    return this.http.get(this.url)
  }

  changePassword(user){
    return this.http.post(`${this.url}/changepassword/${user['code']}`,user)
  }


}
