import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { RequestProfileComponent } from './pages/request-profile/request-profile.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SectorProfileComponent } from './pages/sector-profile/sector-profile.component';
import { SectorsComponent } from './pages/sectors/sectors.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/companies' },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/add', component: CompanyProfileComponent },
  { path: 'companies/:id', component: CompanyProfileComponent },
  { path: 'sectors', component: SectorsComponent },
  { path: 'sectors/add', component: SectorProfileComponent },
  { path: 'sectors/:id', component: SectorProfileComponent },
  { path: 'requests/:status', component: RequestsComponent },
  { path: 'requests/profile/:id', component: RequestProfileComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
