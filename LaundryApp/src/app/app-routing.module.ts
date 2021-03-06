import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { LoginComponent }   from './login/login.component';
import { RegisterComponent }   from './register/register.component';
import { LaundyListComponent }   from './laundy-list/laundy-list.component';
import { HomeComponent }   from './home/home.component';
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'laundy-list', component: LaundyListComponent, canActivate: [AuthGuard] },  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {


}