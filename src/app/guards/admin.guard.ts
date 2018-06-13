import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from "src/app/services/login/login.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    public _LoginService : LoginService
  ){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    
      if(this._LoginService.getUser()['role'] != 'ADMIN'){
        console.log('No es ADMIN')
        return false
      }
    
      return true;
  }
}
