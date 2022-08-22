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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
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
import { CategoriesComponent } from './pages/categories/categories.component';
import { SectorProfileComponent } from './pages/sector-profile/sector-profile.component';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    StartupSubmitFormComponent,
    CompaniesComponent,
    StartupsListComponent,
    CompanyProfileComponent,
    SectorsComponent,
    CategoriesComponent,
    SectorProfileComponent,
    SectorFormComponent,
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
    NzInputModule,NzListModule,NzPageHeaderModule,NzSpaceModule ,NzButtonModule,NzNotificationModule,NzSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
