import { RequestformComponent } from './components/requestform/requestform.component';
import { TypefileComponent } from './components/typefile/typefile.component';
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { CompsComponent } from './components/comps/comps.component';
import { RouterModule,Routes } from '@angular/router';
import { CompformComponent } from './components/compform/compform.component';


const appRoutes : Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'component', component: CompsComponent },
    { path: 'component/add', component: CompformComponent },
    { path: 'component/:id', component: CompformComponent },
    { path: 'typefile', component: TypefileComponent},
    { path: 'request', component: RequestComponent },
    { path: 'request/add', component: RequestformComponent },
    { path: 'request/:id', component: RequestformComponent }
    { path : '**', redirectTo: 'home' }
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true}) 