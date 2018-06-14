import { LoginService } from './../../services/login/login.service';
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
  public status_affected = ['Análisis','Desarrollo','Certificación']
  public componentSelectPath:string = ''

  constructor(
    private router:Router,
    private activeRoute: ActivatedRoute,
    private _requestService:RequestService,
    private _componentService:ComponentService,
    private _loginService:LoginService
  ) { }

  ngOnInit() {
    this.getComponents()
    this.initPage()
  }


  initPage(){
    this.activeRoute.params.subscribe(params=>{
      if(params['id'] != undefined ){
        this.idrequest = params['id']
        this.getRequestByCode(this.idrequest)
      }
    })
  }

  getRequestByCode(id){
    this._requestService.getRequestByCode(id).subscribe(res=>{
      if(res){
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
    this._componentService.listallComponent().subscribe(res=>{
      if(res) {
        console.log(res)
        this.components = res['body'] || []
        this.components = this.components.sort()
      }
    },err => {
      console.log(err)
    })
  }

  onchangeSelect(evento){
    this.componentSelect = this.components.find(p=> {
      if( p['name'] == evento ){
        this.componentSelectPath = p['pathfile']
        return p
      }
    }) 
  }

  processForm(formvalue){
    formvalue['request'] = this.idrequest
    formvalue['user'] = this._loginService.getUser()['nickname'] || 'ADMIN'
    formvalue['component'] = this.componentSelect['code']
    
    if( this.iddetail == null ){ 
      //guardar
      this._componentService.addDetailComponent(formvalue).subscribe(res=>{
        if(res){
          //Verificar estado
          if(this.status_affected.indexOf(this.request['status']) > 0 ){
            this._componentService.updateComponentActive(this.componentSelect['code'], formvalue ).subscribe(res=>{

              this.getRequestDetail()
              this.detail = {component:''}
              this.iddetail = null
              this.componentSelect = {pathfile:''}
              this.showform = false
  
            }, err => console.error("ERROR: ", err))
          }else {
              console.log( 'aaa' )
              this.getRequestDetail()
              this.detail = {component:''}
              this.iddetail = null
              this.componentSelect = {pathfile:''}
              this.showform = false
          }
          
        }
      },err =>{
        console.log( 'Error. ' ,err )  
      })
    }else{
      //actualizar
      console.log( 'Actualizar' )
      formvalue['code'] = this.iddetail
      this._requestService.updateRequestDetail(formvalue).subscribe(res=>{
        this.getRequestDetail()
        this.detail = {component:''}
        this.showform =false
        this.onchangeSelect('')
      },err => console.log( 'Err. ', err ))
    }
  }

  deleteDetail(detail){
    let idcomponent = this.components.find(p => p['name'] == detail['name'])['code']
    if(confirm(`¿Está seguro de eliminar el componente: ${detail['name']}?`)) {
      
      this._componentService.updateComponentActive(idcomponent, {user:''}).subscribe(res=>{

        this._requestService.deteleRequestDetailByCode(detail).subscribe(res=>{
          if(res){
            this.getRequestDetail()
          }
        },err => console.log( 'Err',err ))

      },err1 => console.log( err1 ) )
      
    }
  }

  findComponent(evento){
    console.log( evento )
  }

  select(d){
    this.iddetail = d['code']
    this.detailselect=d;
    this.detail = this.detailselect
    this.detail['component'] = d['name']
    this.onchangeSelect(d['name'])
  }

}
