import { ComponentService } from './services/components/component.service';
import { APP_ROUTES } from './app.route';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CompsComponent } from './components/comps/comps.component';
import { CompdetailComponent } from './components/compdetail/compdetail.component';
import { RequestComponent } from './components/request/request.component';
import { HomeComponent } from './components/home/home.component';
import { RequestdetailComponent } from './components/requestdetail/requestdetail.component';
import { FindComponent } from './components/find/find.component';
import { TypefileComponent } from './components/typefile/typefile.component';
import { Ng2TableModule } from 'ngx-datatable';
import { PaginationModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CompformComponent } from './components/compform/compform.component';
import { RequestformComponent } from './components/requestform/requestform.component';
import { TypefileService } from './services/typefile/typefile.service';
import { RequestService } from './services/request/request.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompsComponent,
    CompdetailComponent,
    RequestComponent,
    HomeComponent,
    RequestdetailComponent,
    FindComponent,
    TypefileComponent,
    CompformComponent,
    RequestformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTES,
    PaginationModule.forRoot(),
    Ng2TableModule
  ],
  providers: [
    ComponentService,
    TypefileService,
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
