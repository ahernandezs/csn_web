import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { DOT } from '../../../utils/dot';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

	mainMenu: false;
	userMenu: false;
	dataForUser;

	constructor(
	    private router: Router,
		private loginService: LoginService,
	    private dot: DOT
	) { }

	ngOnInit() {
		this.dataForUser = JSON.parse(localStorage.getItem('x-data-csn'));
	}

	logout(){
		this.loginService.logout().subscribe(
			res => {
				localStorage.removeItem('x-data-csn');
				localStorage.removeItem("x-auth-token");
				localStorage.removeItem("client_application_id");
				this.router.navigate(['/login']);
			},
			err => {

			}
		);
	}

}
