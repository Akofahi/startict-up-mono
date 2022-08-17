import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/companies' },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/add', component: CompanyProfileComponent },
  { path: 'companies/:id', component: CompanyProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
