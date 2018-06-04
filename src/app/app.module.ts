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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompsComponent,
    CompdetailComponent,
    RequestComponent,
    HomeComponent,
    RequestdetailComponent,
    FindComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
