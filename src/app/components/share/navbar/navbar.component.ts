import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

	mainMenu: false;
	userMenu: false;
	
	constructor() { }

	ngOnInit() {

	}

	login(){
	    localStorage.removeItem('x-auth-token'); 
	}

}
