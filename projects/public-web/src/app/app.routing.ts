import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/___/components.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NucleoiconsComponent } from './components/___/nucleoicons/nucleoicons.component';
import { RequestComponent } from './pages/request/request.component';

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: LandingComponent },
    { path: 'profile',              component: ProfileComponent },
    { path: 'request',              component: RequestComponent },
    { path: 'components',           component: ComponentsComponent },
    { path: 'icons',                component: NucleoiconsComponent },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
