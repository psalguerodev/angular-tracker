import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { CompsComponent } from './components/comps/comps.component';
import { RouterModule,Routes } from '@angular/router';


const appRoutes : Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'component', component: CompsComponent },
    { path: 'request', component: RequestComponent },
    { path : '**', redirectTo: 'home' }
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true}) 