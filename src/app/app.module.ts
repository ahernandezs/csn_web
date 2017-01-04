import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './components/login/index';
import { PageNotFoundComponent } from './components/share/page-not-found/index';
import { AccessComponent } from './components/login/access/index';
import { AccessConfirmationComponent } from './components/login/access-confirmation/index';
import { FooterComponent } from './components/share/footer/index';
import { NavbarComponent } from './components/share/navbar/index';
import { WelcomeAlertComponent } from './components/share/welcome-alert/index';
import { HomeComponent } from './components/home/index';
import { AccountsComponent } from './components/home/accounts/index';
import { MovementsComponent } from './components/movements/index';
import { MovementsTableComponent } from './components/movements/movements-table/index';
import { MapComponent } from './components/map/index';
import { MapContactComponent } from './components/map/map-contact/index';
import { SearchMapComponent } from './components/map/search-map/index';
import { ContactComponent } from './components/contact/index';
import { TransferStep1Component } from './components/transfer-step-1/index';
import { TransferStep2Component } from './components/transfer-step-2/index';
import { TransferStep3Component } from './components/transfer-step-3/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    AccessComponent,
    AccessConfirmationComponent,
    FooterComponent,
    NavbarComponent,
    WelcomeAlertComponent,
    HomeComponent,
    AccountsComponent,
    MovementsComponent,
    MovementsTableComponent,
    MapComponent,
    MapContactComponent,
    SearchMapComponent,
    ContactComponent,
    TransferStep1Component,
    TransferStep2Component,
    TransferStep3Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
