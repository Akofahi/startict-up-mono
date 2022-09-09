import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { StartupsListComponent } from '../components/startups-list/startups-list.component';
import { StartupCardComponent } from '../components/startup-card/startup-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ProfileComponent,
        StartupsListComponent,
        StartupCardComponent
    ]
})
export class PagesModule { }
