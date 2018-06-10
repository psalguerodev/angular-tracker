import { CONF } from './../../conf/conf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url: string = `${CONF.ENDPOINT}request`
  constructor(private http: HttpClient , private _router : Router) { }

  getListAllRequest() {
    return this.http.get(this.url)
  }

  getRequestByCode(code:number){
    return this.http.get(`${this.url}/${code}`)
  }

  addRequest(request) {
    return this.http.post(this.url,request)
  }

  deleteRequest(request) {
    return this.http.delete(`${this.url}/${request['code']}`)
  }

  updateRequest(request) {
    console.log( request['code'] )
    return this.http.put(`${this.url}/${request['code']}`, request)
  }

  getRequestDetailByCode(request){
    // console.log( request )
    return this.http.get(`${this.url}/detail/${request['code']}`)
  }

  deteleRequestDetailByCode(detail){
    return this.http.delete(`${CONF.ENDPOINT}compdetail/${detail['code']}`)
  }

}
