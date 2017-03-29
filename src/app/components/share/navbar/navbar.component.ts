import { Component, OnInit, ViewChild, NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Broadcaster } from '../../../utils/broadcaster';

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
		private broadcaster: Broadcaster
	) { }

	ngOnInit() {
		this.dataForUser = JSON.parse(localStorage.getItem('x-data-csn'));
		this.lastAccessBy = this.dataForUser.last_client_application_id.includes('WEB') ? 'Web' : 'Móvil';
	}

	logout(){
		this.broadcaster.broadcast('message','¿Deseas terminar tu sesión?');
	}

}
