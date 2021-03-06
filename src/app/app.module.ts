import { OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { Utils } from './utils/utils';
import { DOT } from './utils/dot';
import { AuthGuard } from './utils/auth.guards';
import { ShortAccount, Translate, Search, SearchATM, ATM } from './utils/pipes';
import { Broadcaster } from './utils/broadcaster';

import { LoginComponent } from './components/login/index';
import { ActivationComponent } from './components/activation/index';
import { ActivationStep1Component } from './components/activation/activation-step-1/index';
import { ActivationStep2Component } from './components/activation/activation-step-2/index';
import { UnlockStep1Component } from './components/unlockPassword/unlock-step-1/index';
import { UnlockStep2Component } from './components/unlockPassword/unlock-step-2/index';
import { ReactivationComponent } from './components/reactivation/index';
import { ReactivationStep2Component } from './components/reactivation/reactivation-step-2/index';
import { ReactivationStep1Component } from './components/reactivation/reactivation-step-1/index';
import { AccessComponent } from './components/login/access/index';
import { AccessConfirmationComponent } from './components/login/access-confirmation/index';
import { ModalComponent } from './components/share/modal/index';
import { FooterComponent } from './components/share/footer/index';
import { NavbarComponent } from './components/share/navbar/index';
import { NavBarSimpleComponent } from './components/share/navbar-simple/index';
import { HomeComponent } from './components/home/index';
import { MovementsComponent } from './components/movements/index';
import { MovementsTableComponent } from './components/movements/movements-table/index';
import { MapComponent } from './components/map/index';
import { MapContactComponent } from './components/map/map-contact/index';
import { ContactComponent } from './components/contact/index';
import { ActivateAccountComponent } from './components/activateAccount/index';
import { ActivateAccountListComponent } from './components/activateAccount/activateAccountList/index';
import { ActivateAccountStepOneComponent } from './components/activateAccount/activateAccountStepOne/index';
import { AdministrationComponent } from './components/administration/index';
import { ChangePassStepOneComponent } from './components/administration/changePassStepOne/index';
import { ChangePassStepTwoComponent } from './components/administration/changePassStepTwo/index';
import { BlockOneComponent } from './components/administration/blockOne/index';
import { BlockTwoComponent } from './components/administration/blockTwo/index';
import { PromotionsComponent } from './components/promotions/index';
import { TransferComponent } from './components/transfer/index';
import { UnlockPasswordComponent } from './components/unlockPassword/index'

import { NoSpace } from './utils/validations/noSpace';
import { OnlyNumbers } from './utils/validations/onlyNumbers';

import { LoginService } from './services/login.service';
import { AccountService } from './services/account.service';
import { ThirdAccountService } from './services/third.account.service';
import { TransferService } from './services/transfer.service';
import { PromotionService } from './services/promotion.service';
import { MapService } from './services/map.service';
import { HttpClient } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActivationComponent,
    ActivationStep1Component,
    ActivationStep2Component,
    UnlockStep1Component,
    UnlockStep2Component,
    ReactivationComponent,
    ReactivationStep1Component,
    ReactivationStep2Component,
    AccessComponent,
    AccessConfirmationComponent,
    ModalComponent,
    FooterComponent,
    NavbarComponent,
    NavBarSimpleComponent,
    HomeComponent,
    MovementsComponent,
    MovementsTableComponent,
    MapComponent,
    MapContactComponent,
    ContactComponent,
    ActivateAccountComponent,
    ActivateAccountListComponent,
    ActivateAccountStepOneComponent,
    AdministrationComponent,
    ChangePassStepOneComponent,
    ChangePassStepTwoComponent,
    BlockOneComponent,
    BlockTwoComponent,
    PromotionsComponent,
    TransferComponent,
    UnlockPasswordComponent,
    NoSpace,
    OnlyNumbers,
    ShortAccount,
    Translate,
    Search,
    SearchATM,
    ATM
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    TabsModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAMjg5ItWNxU2f-uw6tOz3lFBe_tXcUwlM'
    })
  ],
  providers: [
    LoginService,
    AccountService,
    ThirdAccountService,
    TransferService,
    PromotionService,
    MapService,
    HttpClient,
    Utils,
    DOT,
    AuthGuard,
    Broadcaster
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }