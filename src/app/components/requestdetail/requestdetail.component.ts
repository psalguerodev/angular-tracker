import { LoginService } from './../../services/login/login.service';
import { NgForm, FormBuilder } from '@angular/forms';
import { ComponentService } from './../../services/components/component.service';
import { RequestService } from './../../services/request/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TypefileService } from "src/app/services/typefile/typefile.service";

@Component({
  selector: 'app-requestdetail',
  templateUrl: './requestdetail.component.html',
  styles: []
})
export class RequestdetailComponent implements OnInit {

  public request:any ={} 
  public components:any = []
  public allcomponent:any = []
  public componentSelect:any = {}
  public idrequest:any = null
  public showform: boolean = false

  public detail:any = {component:''}
  public iddetail:any = null
  public details:any = []
  public detailsall:any = []
  public detailselect:any = null

  public find:string = ''
  public status_affected = ['Análisis','Desarrollo','Certificación']
  public componentSelectPath:string = ''

  public typefiles:any =[]
  public extension:any = ''
  public typefileselected:any = {}

  constructor(
    private router:Router,
    private activeRoute: ActivatedRoute,
    private _requestService:RequestService,
    private _componentService:ComponentService,
    private _loginService:LoginService,
    private _typefileService:TypefileService
  ) { }

  ngOnInit() {
    this.getTypefiles()
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

  onchangeSelectExtension(evento){
    if(evento==""){
      this.typefileselected = {}
      return
    }

    this.typefileselected = this.typefiles.find(p=> p['shortname'] === evento )
    this.components = this.allcomponent.filter(p => p['extension'] === evento )
    // console.log(this.allcomponent)
  }

  getRequestDetail(){
    this._requestService.getRequestDetailByCode(this.request).subscribe(result => {
      if(result){
        console.log(result)
        this.details = this.noRepeatData(result['body'],'component')
        this.detailsall = this.details
        // console.log(this.noRepeatData(this.details,'component'))
      }
    },err => {
      console.log( 'Error.', err )
    })
  }

  noRepeatData(data,field1){
    let clean_data = []

    data.forEach(element => {
      if(!clean_data.find(p => p[field1] === element[field1])){
        clean_data.push(element)
      }
    });
    
    return clean_data
  }

  getTypefiles(){
    this._typefileService.listAllTypefile().subscribe(data => {
      if(data){
        console.log(data)
        this.typefiles = data['body']
      } 
    },err => {
      console.log('Error: ' , err )
    })
  }

  getComponents(){
    this._componentService.listallComponent().subscribe(res=>{
      if(res) {
        console.log(res)
        this.allcomponent = res['body'] || []
        this.allcomponent = this.allcomponent.sort()
      }
    },err => {
      console.log(err)
    })
  }

  onchangeSelect(evento){
    if(evento == ""){
      this.componentSelect = {pathfile:''}
      return
    }
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
    if(evento==""){
      let all = this.detailsall
      this.details =  all
      return
    }
    this.details = this.detailsall
                   .filter(p => p['name'].toLowerCase().startsWith(evento.toLowerCase()) )
  }

  select(d){
    this.detailselect=d;
    // this.iddetail = d['code']
    // this.detail = this.detailselect
    // this.detail['component'] = d['name']
    // this.extension = this.detailselect.extension
    // this.onchangeSelectExtension(this.detailselect.extension)
    // this.onchangeSelect(d['name'])
  }

}
