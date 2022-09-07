import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { RequestProfileComponent } from './pages/request-profile/request-profile.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SectorProfileComponent } from './pages/sector-profile/sector-profile.component';
import { SectorsComponent } from './pages/sectors/sectors.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { HomeComponent } from './pages/home/home.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['home']);



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login', component: LoginComponent ,canActivate:[AngularFireAuthGuard],data: { authGuardPipe: redirectLoggedInToItems }},

  {path:'home',component: HomeComponent,canActivate:[AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin },children:[
    { path: 'companies', component: CompaniesComponent ,canActivate:[AngularFireAuthGuard]},
    { path: 'companies/add', component: CompanyProfileComponent,canActivate:[AngularFireAuthGuard] },
    { path: 'companies/:id', component: CompanyProfileComponent ,canActivate:[AngularFireAuthGuard]},
    { path: 'sectors', component: SectorsComponent,canActivate:[AngularFireAuthGuard] },
    { path: 'sectors/add', component: SectorProfileComponent ,canActivate:[AngularFireAuthGuard]},
    { path: 'sectors/:id', component: SectorProfileComponent,canActivate:[AngularFireAuthGuard] },
    { path: 'requests/:status', component: RequestsComponent ,canActivate:[AngularFireAuthGuard]},
    { path: 'requests/profile/:id', component: RequestProfileComponent ,canActivate:[AngularFireAuthGuard]},
  ]}

 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
