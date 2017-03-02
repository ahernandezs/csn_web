import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guards';

import { PageNotFoundComponent } from './components/share/page-not-found/index';
import { LoginComponent } from './components/login/index';
import { ActivationComponent } from './components/activation/index';
import { ReactivationComponent } from './components/reactivation/index';  
import { HomeComponent } from './components/home/index';
import { MovementsComponent } from './components/movements/index';
import { MapComponent } from './components/map/index';
import { ContactComponent } from './components/contact/index';
import { ActivateAccountComponent } from './components/activateAccount/index';
import { AdministrationComponent } from './components/administration/index';
import { PromotionsComponent } from './components/promotions/index';
import { TransferStep1Component } from './components/transfer-step-1/index';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'activation', component: ActivationComponent },
	{ path: 'reactivation', component: ReactivationComponent },
	{ path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
	{ path: 'movements', component: MovementsComponent, canActivate:[AuthGuard] },
	{ path: 'map', component: MapComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'activateAccount', component: ActivateAccountComponent, canActivate:[AuthGuard] },
	{ path: 'administration', component: AdministrationComponent, canActivate:[AuthGuard] },
	{ path: 'promotions', component: PromotionsComponent, canActivate:[AuthGuard] },
	{ path: 'transfer', component: TransferStep1Component, canActivate:[AuthGuard] },
	{ path: '**', redirectTo: 'login' }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
