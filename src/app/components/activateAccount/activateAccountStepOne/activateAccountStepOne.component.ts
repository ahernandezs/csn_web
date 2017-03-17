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

  constructor(
    private thirdAccountService: ThirdAccountService,
	  private router: Router
  ) { }

  ngOnInit() {
    this.step = "1";
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
        },
        error => {
            console.log('Error al activar la cuenta');
        }
    );
  }

}
