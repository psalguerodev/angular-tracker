import { Router } from '@angular/router';
import { RequestService } from './../../services/request/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styles: []
})
export class RequestComponent implements OnInit {

  public requests:any = []

  constructor(
    public _requestService : RequestService,
    public router : Router
  ) { }

  ngOnInit() {
    this.listRequest()
  }

  listRequest() {
    this._requestService.getListAllRequest().subscribe(data=>{
      if(data){
        console.log( data )
        this.requests = data['body']
      }
    },err => {
      console.log( 'Err. ' , err )
    })
  }

  selectRequest(request) {
    console.log( request )
    this.router.navigate(['request', request['code']])
  }


}
