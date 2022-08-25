import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBodyComponent } from './main-body/main-body.component';
import { RequestFormComponent } from './request-form/request-form.component';

const routes: Routes = [  
  { path: '', pathMatch: 'full', redirectTo: '/' },
  {path:'',component: RequestFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
