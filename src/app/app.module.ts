import { OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TabsModule } from 'ng2-bootstrap';

import { Utils } from './utils/utils';
import { DOT } from './utils/dot';
import { AuthGuard } from './utils/auth.guards';

import { LoginComponent } from './components/login/index';
import { ActivationComponent } from './components/activation/index';
import { ActivationStep1Component } from './components/activation/activation-step-1/index';
import { ActivationStep2Component } from './components/activation/activation-step-2/index';
import { ReactivationComponent } from './components/reactivation/index';
import { ReactivationStep2Component } from './components/reactivation/reactivation-step-2/index';
import { ReactivationStep1Component } from './components/reactivation/reactivation-step-1/index';
import { PageNotFoundComponent } from './components/share/page-not-found/index';
import { AccessComponent } from './components/login/access/index';
import { AccessConfirmationComponent } from './components/login/access-confirmation/index';
import { FooterComponent } from './components/share/footer/index';
import { NavbarComponent } from './components/share/navbar/index';
import { NavBarActivationComponent } from './components/share/navbar-activation/index';
import { WelcomeAlertComponent } from './components/share/welcome-alert/index';
import { HomeComponent } from './components/home/index';
import { AccountsComponent } from './components/home/accounts/index';
import { MovementsComponent } from './components/movements/index';
import { MovementsTableComponent } from './components/movements/movements-table/index';
import { MapComponent } from './components/map/index';
import { MapContactComponent } from './components/map/map-contact/index';
import { SearchMapComponent } from './components/map/search-map/index';
import { ContactComponent } from './components/contact/index';
import { ActivateAccountComponent } from './components/activateAccount/index';
import { ActivateAccountListComponent } from './components/activateAccount/activateAccountList/index';
import { ActivateAccountStepOneComponent } from './components/activateAccount/activateAccountStepOne/index';
import { ActivateAccountStepTwoComponent } from './components/activateAccount/activateAccountStepTwo/index';
import { AdministrationComponent } from './components/administration/index';
import { ChangePassStepOneComponent } from './components/administration/changePassStepOne/index';
import { ChangePassStepTwoComponent } from './components/administration/changePassStepTwo/index';
import { PromotionsComponent } from './components/promotions/index';
import { TransferStep1Component } from './components/transfer-step-1/index';
import { TransferStep2Component } from './components/transfer-step-1/transfer-step-2/index';
import { TransferStep3Component } from './components/transfer-step-1/transfer-step-3/index';
import { TransferStep11Component } from './components/transfer-step-1/transfer-step-1-1/index';

import { LoginService } from './services/login.service';
import { AccountService } from './services/account.service';
import { ThirdAccountService } from './services/third.account.service';
import { TransferService } from './services/transfer.service';
import { PromotionService } from './services/promotion.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActivationComponent,
    ActivationStep1Component,
    ActivationStep2Component,
    ReactivationComponent,
    ReactivationStep1Component,
    ReactivationStep2Component,
    PageNotFoundComponent,
    AccessComponent,
    AccessConfirmationComponent,
    FooterComponent,
    NavbarComponent,
    NavBarActivationComponent,
    WelcomeAlertComponent,
    HomeComponent,
    AccountsComponent,
    MovementsComponent,
    MovementsTableComponent,
    MapComponent,
    MapContactComponent,
    SearchMapComponent,
    ContactComponent,
    ActivateAccountComponent,
    ActivateAccountListComponent,
    ActivateAccountStepOneComponent,
    ActivateAccountStepTwoComponent,
    AdministrationComponent,
    ChangePassStepOneComponent,
    ChangePassStepTwoComponent,
    PromotionsComponent,
    TransferStep1Component,
    TransferStep2Component,
    TransferStep3Component,
    TransferStep11Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TabsModule
  ],
  providers: [
    LoginService,
    AccountService,
    ThirdAccountService,
    TransferService,
    PromotionService,
    Utils,
    DOT,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnDestroy {
  ngOnDestroy(){
    window.alert('aquí avisar si se quieren salir, mandar el logout y borrar las variables del localstorage... creo');
  }
}