import { CONF } from './../../conf/conf';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggued:boolean = false
  public isAdmin:boolean = false

  private userLoggued:any = null
  private url:string = `${CONF.ENDPOINT}user/login`
  private itemstorage:string ='trackerloggued'

  constructor(
    public http:HttpClient,
    public router:Router
  ) { this.loggued() }

  login(user){
    return new Promise((resolve,reject)=>{
      this.http.post(this.url,user).subscribe(res=>{
        console.log(res)
        this.userLoggued = res['body']
        if(res['body']['role']=='ADMIN'){
          this.isAdmin = true
        }
        this.isLoggued = true
        localStorage.setItem(this.itemstorage, JSON.stringify(this.userLoggued))
        resolve(true)

      },err => {
        reject(err)
      })
    })
  }

  logout(){
    this.isLoggued = false
    this.userLoggued = null
    this.isAdmin = false
    localStorage.removeItem(this.itemstorage)
    localStorage.removeItem('page-component-tracker')
    this.router.navigate(['login'])
  }

  getUser(){
    return this.userLoggued || JSON.parse(localStorage.getItem(this.itemstorage))
  }

  loggued(){
    let res = this.getUser()
    if( res != null ){
      this.isLoggued = true
      this.isAdmin = (res['role']=='ADMIN') ? true : false
      this.userLoggued = res
    }
  }

}
