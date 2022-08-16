import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { CompaniesComponent } from './pages/companies/companies.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/companies' },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/:id', component: CompanyProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
