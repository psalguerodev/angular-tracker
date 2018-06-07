import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TableData } from '../../mock/DataTable';
import { ComponentService } from '../../services/components/component.service';

@Component({
  selector: 'app-comps',
  templateUrl: './comps.component.html',
  styleUrls: ['./comps.component.css']
})
export class CompsComponent implements OnInit {

  public components: any  = []

  constructor(public _compService : ComponentService, public router : Router) {

  }

  ngOnInit() {
    this.listComponents()
  }

  listComponents(){
    this._compService.getListComponents().subscribe(data => {
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
}
