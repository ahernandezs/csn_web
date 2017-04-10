import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-simple',
  templateUrl: './navbar-simple.component.html',
  styleUrls: ['./navbar-simple.component.sass']
})
export class NavBarSimpleComponent {

  @Input() title: string;

  constructor(
      private router: Router
    ){ }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

}
