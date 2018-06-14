import { Router } from '@angular/router';
import { Component, OnInit , OnDestroy } from '@angular/core';
import { TableData } from '../../mock/DataTable';
import { ComponentService } from '../../services/components/component.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-comps',
  templateUrl: './comps.component.html',
  styleUrls: ['./comps.component.css']
})
export class CompsComponent implements OnInit , OnDestroy{

  public components: any  = []
  public page:number = 0
  public countNext:number = 0
  public total:number = 0
  public itemStorage:string = 'page-component-tracker'

  constructor(
    public _compService : ComponentService, 
    public router : Router,
    public activedRoute:ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.countNext = parseInt(localStorage.getItem(this.itemStorage),10) || 20
    this.page      = (this.countNext != 0 ) ? 0 : this.page
    this.listComponents()
  }

  ngOnDestroy(){
    localStorage.removeItem(this.itemStorage)
  }

  listComponents(){
    this._compService.getListComponents(this.page,this.countNext).subscribe(data => {
      this.components = data['body']
      console.log(this.components)
    },err => {
      console.error('Error:' + err )
    })
  }

  selectComponent(component) {
    console.log(component)
    this.router.navigate(['component', component['code']])
  }

  deleteComponent(component){
    if( confirm(`¿Está seguro de eliminar: ${component['name']}?`)){
      this._compService.deleteComponent(component).subscribe(data=>{

        this.listComponents()

      },err => {
        console.error('Error:' + err )
      })
    }
  }

  loadMore(){
    this.countNext += 20;
    localStorage.setItem(this.itemStorage, this.countNext.toString())
    this._compService.getListComponents(this.countNext,20).subscribe((data:any)=>{

      if(data && this.components ){
        data['body'].forEach( c => {
          this.components.push(c)
        });
      }

    },err => {
      console.log('Error. ' , err )
    })
  }
}
