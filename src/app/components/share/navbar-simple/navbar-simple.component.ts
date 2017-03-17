import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-simple',
  templateUrl: './navbar-simple.component.html',
  styleUrls: ['./navbar-simple.component.sass']
})
export class NavBarSimpleComponent {

  @Input() title: string;

}
