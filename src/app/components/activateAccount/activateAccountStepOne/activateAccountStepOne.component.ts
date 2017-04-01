import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ThirdAccountService } from '../../../services/third.account.service';
import { ThirdAccount } from '../../../models/third-account';
import { ActivateThirdAccountRequest } from '../../../models/activate-third-account-request';

@Component({
  selector: 'app-activateAccountStepOne',
  templateUrl: './activateAccountStepOne.component.html',
  styleUrls: ['./activateAccountStepOne.component.sass']
})
export class ActivateAccountStepOneComponent implements OnInit {

  step: string;
  activation_code;
  result;
  error: boolean;
  errorMessage: string;

  constructor(
    private thirdAccountService: ThirdAccountService,
	  private router: Router
  ) { }

  ngOnInit() {
    this.step = "1";
    this.error = false;
  }

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<String> = new EventEmitter();
  @Input() thirdAccount: ThirdAccount;

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  changeView(view: String): void {
      this.routeView.emit(view);
  }

  activate(){
    let activateThirdAccountRequest: ActivateThirdAccountRequest = new ActivateThirdAccountRequest(this.activation_code,this.thirdAccount._account_id+"");
    this.thirdAccountService.activateThirdAccount(activateThirdAccountRequest).subscribe(
        response => {
            this.step = "2";
            this.result = response;
            this.error = false;
        },
        error => {
            if(error.status === 401){
              this.errorMessage = 'Sesión inválida';
            }
            if(error.status === 503){
              let cod = JSON.parse(error._body);
              if(cod.code === 101)
                this.errorMessage = 'Cliente no encontrado';
              if(cod.code === 109)
                this.errorMessage = 'No se pudo realizar el cambio de estatus';
              if(cod.code === 110)
                this.errorMessage = 'No se encontró ninguna cuenta asociada con el código de activación';
              if(cod.code === 111)
                this.errorMessage = 'La cuenta ya está activada';
              if(cod.code === 112)
                this.errorMessage = 'El código de activación no es válido';
            }
            if(error.status === 504){
              this.errorMessage = 'Tiempo de espera agotado';
            }
            this.error = true;
        }
    );
  }

}
