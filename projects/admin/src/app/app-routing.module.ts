import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
