import { Component, OnInit, ViewChild, NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
		private viewContainerRef: ViewContainerRef
	) { }

	ngOnInit() {
		this.dataForUser = JSON.parse(localStorage.getItem('x-data-csn'));
		this.lastAccessBy = this.dataForUser.last_client_application_id.includes('WEB') ? 'Web' : 'Móvil';
	}

	@ViewChild('childModal') public childModal: ModalComponent;

	logout(){
		this.childModal.show();
	}

}
