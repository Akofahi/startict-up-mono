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
import { canActivate } from '@angular/fire/compat/auth-guard';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['/home/companies']);



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToItems) },
  {
    path: 'home', component: HomeComponent,  ...canActivate(redirectUnauthorizedToLogin) , children: [
      { path: 'companies', component: CompaniesComponent },
      { path: 'companies/add', component: CompanyProfileComponent },
      { path: 'companies/:id', component: CompanyProfileComponent },
      { path: 'sectors', component: SectorsComponent },
      { path: 'sectors/add', component: SectorProfileComponent },
      { path: 'sectors/:id', component: SectorProfileComponent },
      { path: 'requests/:status', component: RequestsComponent },
      { path: 'requests/profile/:id', component: RequestProfileComponent },
    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
