import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

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
	) { }

	ngOnInit() {
		this.dataForUser = JSON.parse(localStorage.getItem('x-data-csn'));
		this.lastAccessBy = this.dataForUser.last_client_application_id.includes('WEB') ? 'Web' : 'Móvil';
	}

	logout(){
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
