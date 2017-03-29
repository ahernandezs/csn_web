import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { Broadcaster } from '../../../utils/broadcaster';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';

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
	subscription;
  timer;
  timeout = "2:00";

  constructor(
      private router: Router,
      private loginService: LoginService,
      private broadcaster: Broadcaster,
    ){ }

    ngOnInit(){
      this.timer = Observable.timer(0,1000);
      this.registerStringBroadcast();
    }

    show(){
      this.childModal.show();
    }

    hide(){
      this.childModal.hide();
    }

    ocultar(){
      let x = document.getElementsByClassName("modal-backdrop");
      console.log('elementos: '+x);
      for(let i = 0 ; i<x.length; i++){
        let y = <HTMLElement>x[i]
        y.style.display = "none";
        console.log('poniendo el display none');
      }
    }

    logout(){
        this.loginService.logout().subscribe(
          res => {
            localStorage.removeItem('x-data-csn');
            localStorage.removeItem('x-auth-token');
            localStorage.removeItem('client_application_id');
            localStorage.removeItem('user_login_csn');
            this.ocultar();
            this.router.navigate(['/login']);
          },
          err => {
            window.alert('error al cerrar sesión');
            this.ocultar();
            this.router.navigate(['/login']);
          }
        );
    }

    registerStringBroadcast() {
      this.broadcaster.on<string>('timeout')
        .subscribe(message => {
            this.type = 'timeout'
            this.title = 'Cierre de sesión';
		        if(this.subscription != null ){
			        this.subscription.unsubscribe();
		        }
            this.subscription = this.timer.subscribe(t => {
              this.timeout = Math.floor((120-t) / 60) + ':' + ((((120-t)%60) > 9) ? ((120-t)%60) : '0'+((120-t)%60));
              if(this.type === 'timeout'){
                this.message = 'Tu sesión se cerrará por inactividad en '+this.timeout+'. Realiza una consulta u operación.';
              }
            });
            this.show();
      });
      this.broadcaster.on<string>('message')
        .subscribe(message => {
          this.type = 'dialog';
          this.title = 'Aviso'
          this.message = message;
          this.show();
      });
      this.broadcaster.on<string>('loader')
        .subscribe( () => {
          this.type = 'loader';
          this.show();
      });
      this.broadcaster.on<string>('clear')
        .subscribe(message => {
          this.childModal.hide();
      });
    }

}