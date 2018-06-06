import { CONF } from './../../conf/conf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient , private _router : Router) { }

  public getListComponents() {
    let url = `${CONF.ENDPOINT}component` 
    return this.http.get(url)
  }

  public addComponent(component) : Observable<{}> {
    let url = `${CONF.ENDPOINT}component`
    return this.http.post(url,component, {})
  }

  public deleteComponent(component) {
    let url = `${CONF.ENDPOINT}component/${component.id}`
    return this.http.delete(url,{})
  }

  public updateComponent(component) {
    let url = `${CONF.ENDPOINT}component/${component.id}`
    return this.http.put(url,component,{})
  }

  private handleError(error: string) {
    console.error(
      `Backend returned code ${error}, ` +
      `body was: ${error}`);

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
