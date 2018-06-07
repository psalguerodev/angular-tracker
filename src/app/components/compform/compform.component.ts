import { TypefileService } from './../../services/typefile/typefile.service';
import { Component, OnInit } from '@angular/core';
import { ComponentService } from './../../services/components/component.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compform',
  templateUrl: './compform.component.html',
  styles: []
})
export class CompformComponent implements OnInit {

  public component : any = {
    name : '',
    pathfile: '',
    extension: ''
  }
  public idcomponent :number = null
  public typefiles:any = []
  public typefileselect:any = {}


  constructor(
    private _compService : ComponentService,
    private activeRoute : ActivatedRoute,
    private _typeFileService : TypefileService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getListTypefile()
    this.getComponentByCode()
  }

  getComponentByCode(){
    this.activeRoute.params.subscribe(params => {
      console.log( params )
      if( params['id'] != undefined ){
        console.log( params['id'] )
        this.idcomponent = parseInt(params['id'],10) || null
        console.log( this.idcomponent )

        this._compService.getComponentById(params['id']).subscribe(data=>{
          if(data){
            this.component = data['component']
            this.component['filepath'] = data['component']['pathfile']
            this.onchangeSelect(this.component['extension'])
            console.log(this.component)
          }
        },err=> {
          console.log('Error. ',err)
        })
      }else{
        this.idcomponent = 0
      }
    })
  }

  getListTypefile() {
    this._typeFileService.listAllTypefile().subscribe(data=>{

      if(data){
        this.typefiles = data['body']
        console.log( this.typefiles )
      }

    },err => {
      console.log( 'Error: ' , err )
    })
  }

  processForm(valueform) {
    console.log(valueform)
    if( this.idcomponent == 0){
      // Guardar
      console.log( 'Guardar!' )
      this._compService.addComponent(valueform).subscribe(res=>{
        if(res){
          console.log( res['id'] )

          this.router.navigate(['component', res['id']])
        }
      },err => {
        console.log( err )
      })
    }else{
      //Actualizar
      console.log( 'Actualizar' )
      valueform['code'] = this.idcomponent
      console.log( valueform )
      this._compService.updateComponent(valueform).subscribe(res=>{
        if(res){
          console.log(res)
          this.router.navigate(['component'])
        }
      },err=>{
        console.log(err)
      })
    }
  }

  onchangeSelect(evento){
    console.log( evento )
    this.typefileselect = this.typefiles.find(p => p['shortname'] == evento )
    console.log( this.typefileselect )
  }

  onchangeInput(evento){
    console.log(evento)
    // this.component.pathfile = ''
    // this.component.pathfile = evento + '/' + this.component.name
  }



}
