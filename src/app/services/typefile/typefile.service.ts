import { CONF } from './../../conf/conf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypefileService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  private url:string = `${CONF.ENDPOINT}typefile`

  constructor(private http: HttpClient , private _router : Router) { }

  public addTypefile(typefile){
    return this.http.post(this.url,typefile)
  }

  public updateTypefile(typefile){
    return this.http.put(this.url+'/'+typefile['code'] , typefile)
  }

  public deleteTypefile(typefile){
    return this.http.delete(this.url+'/'+typefile['code'])
  }

  public listAllTypefile() {
    return this.http.get(this.url)
  }
}
