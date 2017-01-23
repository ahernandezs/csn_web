import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/share/page-not-found/index';
import { LoginComponent } from './components/login/index';
import { HomeComponent } from './components/home/index';
import { MovementsComponent } from './components/movements/index';
import { MapComponent } from './components/map/index';
import { ContactComponent } from './components/contact/index';
import { TransferStep1Component } from './components/transfer-step-1/index';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'movements', component: MovementsComponent },
	{ path: 'map', component: MapComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'transfer', component: TransferStep1Component },
	{ path: '**', component: PageNotFoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
