import { RequestService } from './../../services/request/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styles: []
})
export class RequestformComponent implements OnInit {

  public request :any = {status:''}
  public idrequest : any = null

  constructor(
    private activeroute : ActivatedRoute,
    private router : Router ,
    private _requestService : RequestService
  ) { }

  ngOnInit() {
    this.getRequestByCode()
  }

  getRequestByCode(){
    this.activeroute.params.subscribe(params => {

      if(params['id'] != undefined ){
        this.idrequest = params['id']
        console.log( this.idrequest )

        this._requestService.getRequestByCode(this.idrequest).subscribe(data=>{
          if(data){
            console.log( data )
            this.request = data['body']
          }
        },err => {
          console.log(err)
        })
      }
    })
  }

  processForm(formvalue){
    formvalue['user'] = 9
    if(this.idrequest == null ){
      //Guardar
      console.log(formvalue)
      this._requestService.addRequest(formvalue).subscribe(res=>{
        if(res){
          console.log(res)
          this.router.navigate(['request'])
        }
      },err=>{
        console.log( 'Error. ' ,err )
      })
    }else{
      //Actualizar
      formvalue['code'] = this.idrequest
      this._requestService.updateRequest(formvalue).subscribe(res=>{
        if(res){
          console.log(res)
          this.router.navigate(['request'])
        }
      },err => {
        console.error(err)
      })
    }
  }

}
