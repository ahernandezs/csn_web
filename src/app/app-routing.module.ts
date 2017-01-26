import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/share/page-not-found/index';
import { LoginComponent } from './components/login/index';
import { ActivationComponent } from './components/activation/index';
import { ReactivationComponent } from './components/reactivation/index';  
import { HomeComponent } from './components/home/index';
import { MovementsComponent } from './components/movements/index';
import { MapComponent } from './components/map/index';
import { ContactComponent } from './components/contact/index';
import { PromotionsComponent } from './components/promotions/index';
import { TransferStep1Component } from './components/transfer-step-1/index';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'activation', component: ActivationComponent },
	{ path: 'reactivation', component: ReactivationComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'movements', component: MovementsComponent },
	{ path: 'map', component: MapComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'promotions', component: PromotionsComponent },
	{ path: 'transfer', component: TransferStep1Component },
	{ path: '**', component: PageNotFoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
