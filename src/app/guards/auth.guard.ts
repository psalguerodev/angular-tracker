import { LoginService } from './../services/login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public _loginUser:LoginService,
    public router:Router
  ){
  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Promise<boolean> | boolean {
    if( this._loginUser.isLoggued ){
      return true; 
    }else{
      console.log( 'No está logueado' )
      this.router.navigate(['login'])
      return false
    }
  }
}
