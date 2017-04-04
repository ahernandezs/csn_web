import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ThirdAccountService } from '../../../services/third.account.service';
import { ThirdAccount } from '../../../models/third-account';
import { ActivateThirdAccountRequest } from '../../../models/activate-third-account-request';
import { Error } from '../../../models/error';

@Component({
  selector: 'app-activateAccountStepOne',
  templateUrl: './activateAccountStepOne.component.html',
  styleUrls: ['./activateAccountStepOne.component.sass']
})
export class ActivateAccountStepOneComponent {

  step: string;
  activation_code;
  result;
  error: Error;
  @Output() routeView: EventEmitter<String> = new EventEmitter();
  @Input() thirdAccount: ThirdAccount;

  constructor(
    private thirdAccountService: ThirdAccountService,
	  private router: Router
  ) {
    this.error = new Error(false, '');
    this.step = "1";
  }

  changeView(view: String): void {
      this.routeView.emit(view);
  }

  activate(){
    let activateThirdAccountRequest: ActivateThirdAccountRequest = new ActivateThirdAccountRequest(this.activation_code,this.thirdAccount._account_id+"");
    this.thirdAccountService.activateThirdAccount(activateThirdAccountRequest).subscribe(
        response => {
            this.step = "2";
            this.result = response;
            this.error.show = false;
        },
        error => {
            this.error.message = error;
            this.error.show = true;
        }
    );
  }

  numbers(event) {
    var numbers = "0123456789";
    var event = event || window.event;
    var codigoCaracter = event.charCode || event.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);

    return numbers.indexOf(caracter) != -1;
  }

}
