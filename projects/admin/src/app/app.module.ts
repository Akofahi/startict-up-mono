import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { provideStorage, getStorage } from '@angular/fire/storage';

import { StartupSubmitFormComponent } from './startup-submit-form/startup-submit-form.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StartupsListComponent } from './startups-list/startups-list.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { SectorsComponent } from './pages/sectors/sectors.component';
import { SectorProfileComponent } from './pages/sector-profile/sector-profile.component';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FirebaseService } from 'projects/libs/src/firebase.service';
import { RequestsComponent } from './pages/requests/requests.component';
import { RequestProfileComponent } from './pages/request-profile/request-profile.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
  BUCKET,
  
} from "@angular/fire/compat/storage";
import { LoginComponent } from './auth/login/login.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    StartupSubmitFormComponent,
    CompaniesComponent,
    StartupsListComponent,
    CompanyProfileComponent,
    SectorsComponent,

    SectorProfileComponent,
    SectorFormComponent,
    RequestsComponent,
    RequestProfileComponent,
    LoginComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzListModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzNotificationModule,
    NzSelectModule,NzUploadModule,NzMessageModule,AngularFireStorageModule,AngularFireModule.initializeApp(environment.firebase, "cloud"),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage())
  ],
  providers: [FirebaseService, { provide: NZ_I18N, useValue: en_US },{ provide: BUCKET, useValue: "startict-up.appspot.com" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
