import { TypefileService } from './../../services/typefile/typefile.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-typefile',
  templateUrl: './typefile.component.html',
  styleUrls: ['./typefile.component.css']
})
export class TypefileComponent implements OnInit {

  public typefiles:any = []
  public typefile :any = {}

  constructor(public _typefileService : TypefileService) { }

  ngOnInit() {
    this.getListTypefile()
  }

  getListTypefile() {
    this._typefileService.listAllTypefile().subscribe(data=>{
      this.typefiles = data['body']
      console.log(this.typefiles)
    },err => {
      console.log('Error. ' , err )
    })
  }

  processForm(valueform) {
    console.log(valueform)
    if(this.typefile['code'] != undefined ){
      //	Actualizar
      valueform.code = this.typefile['code']
      this._typefileService.updateTypefile(valueform).subscribe(data=>{
        this.getListTypefile()
        console.log( 'Actualizar' )
        this.typefile =  {}
      },err => {
        console.log('Error.' , err )
      })
    }else{
      // Guardar
      this._typefileService.addTypefile(valueform).subscribe(data=>{
        this.getListTypefile()
        this.typefile =  {}
        console.log( 'Guardar' )
      },err => {
        console.log('Error.' , err )
      })
    }
  }

  selectType(type){
    console.log(type)
    this.typefile = type
  }

}
