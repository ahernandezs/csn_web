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
	
	constructor(
	    private router: Router,
		private loginService: LoginService
	) { }

	ngOnInit() {

	}

	logout(){
		this.loginService.logout().subscribe(
			res => {
				localStorage.removeItem('x-auth-token');
			},
			err => {

			}
		);
        this.router.navigate(['/login']);
	}

}
