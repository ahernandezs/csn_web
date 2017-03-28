import { Component, OnInit, ViewChild, NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { ModalDirective, ModalModule } from 'ng2-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

	mainMenu: false;
	userMenu: false;
	dataForUser;
	lastAccessBy;

	constructor(
	    private router: Router,
		private loginService: LoginService,
		private viewContainerRef: ViewContainerRef
	) { }

	ngOnInit() {
		this.dataForUser = JSON.parse(localStorage.getItem('x-data-csn'));
		this.lastAccessBy = this.dataForUser.last_client_application_id.includes('WEB') ? 'Web' : 'Móvil';
	}

	@ViewChild('childModal') public childModal: ModalComponent;

	logout(){
		//this.childModal.show();
		let resp = window.confirm("¿Deseas terminar tu sesión?");
		if(resp === true){
			this.loginService.logout().subscribe(
				res => {
					localStorage.removeItem('x-data-csn');
					localStorage.removeItem('x-auth-token');
					localStorage.removeItem('client_application_id');
					localStorage.removeItem('user_login_csn');
					this.router.navigate(['/login']);
				},
				err => {
					window.alert('error al cerrar sesión');
					this.router.navigate(['/login']);
				}
			);
		}
	}

}
