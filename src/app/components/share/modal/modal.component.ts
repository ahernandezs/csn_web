import {Component,Input, ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})

export class ModalComponent {
  @ViewChild('childModal') public childModal:ModalDirective;
  @Input() title:string;
  constructor(
    private router: Router,
    private loginService: LoginService){ }

    show(){
      this.childModal.show();
    }
    hide(){
      this.childModal.hide();
    }

    logout(){
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