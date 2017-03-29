import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../utils/broadcaster';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})

export class ModalComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  type;
  message;
  title;

  constructor(
      private router: Router,
      private loginService: LoginService,
      private broadcaster: Broadcaster
    ){ }

    ngOnInit(){
      this.registerStringBroadcast();
    }

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

    registerStringBroadcast() {
      this.broadcaster.on<string>('timeout')
        .subscribe(message => {
          this.type = 'timeout'
          this.title = 'Cierre de sesión';
          this.message = 'Tu sesión se cerrará en '+message+' por inactividad.';
          this.show();
      });
      this.broadcaster.on<string>('message')
        .subscribe(message => {
          this.type = 'Aviso'
          this.message = message;
          this.show();
      });
      this.broadcaster.on<string>('loader')
        .subscribe( () => {
          console.log('loader');
          this.type = 'loader';
          this.show();
      });
      this.broadcaster.on<string>('clear')
        .subscribe(message => {
          console.log('limpiando');
          this.hide();
      });
    }

}