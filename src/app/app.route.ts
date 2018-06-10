import { RequestformComponent } from './components/requestform/requestform.component';
import { TypefileComponent } from './components/typefile/typefile.component';
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { CompsComponent } from './components/comps/comps.component';
import { RouterModule,Routes } from '@angular/router';
import { CompformComponent } from './components/compform/compform.component';
import { RequestdetailComponent } from './components/requestdetail/requestdetail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const appRoutes : Routes = [
    { path: 'login' , canActivate:[LoginGuard], component: LoginComponent},
    { path: 'home', canActivate:[AuthGuard], component: HomeComponent },
    { path: 'component',canActivate:[AuthGuard], component: CompsComponent },
    { path: 'component/add', canActivate:[AuthGuard],component: CompformComponent },
    { path: 'component/:id',canActivate:[AuthGuard], component: CompformComponent },
    { path: 'typefile',canActivate:[AuthGuard], component: TypefileComponent},
    { path: 'request',canActivate:[AuthGuard], component: RequestComponent },
    { path: 'request/add', canActivate:[AuthGuard],component: RequestformComponent },
    { path: 'request/:id', canActivate:[AuthGuard],component: RequestformComponent },
    { path: 'request/detail/:id', canActivate:[AuthGuard], component: RequestdetailComponent },
    { path : '**', redirectTo: 'home' }
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true}) 