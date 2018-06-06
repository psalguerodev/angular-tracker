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
    
  }

  addRequest(request) {

  }

  deleteRequest(request) {

  }

  updateRequest(request) {

  }

}
