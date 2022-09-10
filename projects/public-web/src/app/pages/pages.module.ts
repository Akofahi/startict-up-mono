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
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),    
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ProfileComponent,
        StartupsListComponent,
        StartupCardComponent
    ],
    providers: [FirebaseService]
})
export class PagesModule { }
