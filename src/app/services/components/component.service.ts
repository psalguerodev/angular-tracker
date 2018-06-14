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

  public getListComponents(page:number,items?:number) {
    let url = `${CONF.ENDPOINT}component/${page}/${items}` 
    return this.http.get(url)
  }

  public listallComponent(){
    let url = `${CONF.ENDPOINT}component/all`
    return this.http.get(url)
  }

  public getComponentById(code) {
    let url = `${CONF.ENDPOINT}component/get/one/${code}`
    return this.http.get(url) 
  }

  public addComponent(component) : Observable<{}> {
    let url = `${CONF.ENDPOINT}component`
    return this.http.post(url,component, {})
  }

  public deleteComponent(component) {
    let url = `${CONF.ENDPOINT}component/${component.code}`
    return this.http.delete(url,{})
  }

  public updateComponent(component) {
    component['pathfile'] = component['filepath']
    let url = `${CONF.ENDPOINT}component/${component.code}`
    return this.http.put(url,component,{})
  }

  public updateComponentActive(id,value) {
    let url = `${CONF.ENDPOINT}component/active/${id}`
    return this.http.put(url,value)
  }

  public addDetailComponent(detailcomponent){
    let url = `${CONF.ENDPOINT}compdetail`
    return this.http.post(url,detailcomponent)
  }

}
