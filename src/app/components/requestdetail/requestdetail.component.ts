import { NgForm, FormBuilder } from '@angular/forms';
import { ComponentService } from './../../services/components/component.service';
import { RequestService } from './../../services/request/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requestdetail',
  templateUrl: './requestdetail.component.html',
  styles: []
})
export class RequestdetailComponent implements OnInit {

  public request:any ={} 
  public components:any = []
  public componentSelect:any = {}
  public idrequest:any = null
  public showform: boolean = false

  public detail:any = {component:''}
  public iddetail:any = null
  public details:any = []
  public detailselect:any = null

  public find:string = ''

  constructor(
    private router:Router,
    private activeRoute: ActivatedRoute,
    private _requestService:RequestService,
    private _componentService:ComponentService
  ) { }

  ngOnInit() {
    this.getComponents()
    this.initPage()
  }


  initPage(){
    this.activeRoute.params.subscribe(params=>{
      if(params['id'] != undefined ){
        this.idrequest = params['id']
        console.log( this.request )
        this.getRequestByCode(this.idrequest)
      }
    })
  }

  getRequestByCode(id){
    this._requestService.getRequestByCode(id).subscribe(res=>{
      if(res){
        console.log(res)
        this.request = res['body']
        this.getRequestDetail()
      }
    },err => {
      console.log(err)
    })
  }

  getRequestDetail(){
    this._requestService.getRequestDetailByCode(this.request).subscribe(result => {
      if(result){
        console.log(result)
        this.details = result['body']
      }
    },err => {
      console.log( 'Error.', err )
    })
  }

  getComponents(){
    this._componentService.getListComponents().subscribe(res=>{
      if(res) {
        console.log(res)
        this.components = res['body'] || []
      }
    },err => {
      console.log(err)
    })
  }

  onchangeSelect(evento){
    this.componentSelect = this.components.find(p=> p['name'] == evento ) || {}
  }

  processForm(formvalue){
    formvalue['request'] = this.idrequest
    formvalue['user'] = 'XT7226'
    formvalue['component'] = this.componentSelect['code']
    
    console.log(formvalue)
    if( this.iddetail == null ){ 
      //guardar
      this._componentService.addDetailComponent(formvalue).subscribe(res=>{
        if(res){
          console.log(res)
          this.getRequestDetail()
          this.detail = {componet:''}
          this.showform = false
        }
      },err =>{
        console.log( 'Error. ' ,err )  
      })
    }else{
      //actualizar
    }
  }

  deleteDetail(detail){
    console.log( detail )
    if(confirm(`¿Está seguro de eliminar el componente: ${detail['name']}?`)) {
      this._requestService.deteleRequestDetailByCode(detail).subscribe(res=>{
        if(res){
          this.getRequestDetail()
        }
      },err => console.log( 'Err',err ))
    }
  }

  

}
