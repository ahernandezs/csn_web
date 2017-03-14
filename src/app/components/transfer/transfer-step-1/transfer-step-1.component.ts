import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../../services/account.service'
import { ThirdAccountService } from '../../../services/third.account.service';

@Component({
  selector: 'app-transfer-step-1',
  templateUrl: './transfer-step-1.component.html',
  styleUrls: ['./transfer-step-1.component.sass']
})
export class TransferStep1Component implements OnInit {

  constructor(
    private thirdAccountService: ThirdAccountService,
    private accountService: AccountService
  ) { }

  thirdAccounts;
  ownAccounts;

  sourceAccountId: string;
  account_id_destination: string;
  amount: string;
  concept: string;

  ngOnInit() {
    this.accountService.getAccounts().subscribe(
      response => {
        this.ownAccounts = response;
        console.log('en transfer, ownAccounts: '+JSON.stringify(this.ownAccounts));
      },
      err => {
        console.log('Error al traer las cuentas propias');
      }
    );
    this.thirdAccountService.getThirdAccounts().subscribe(
      response => {
        this.thirdAccounts = response;
        console.log('en transfer, thirdAccounts: '+JSON.stringify(this.thirdAccounts));
      },
      error => {
        console.log('Error al traer las cuentas de terceros');
      }
    );
  }

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  changeView(view: String): void {
      this.routeView.emit(view);
  }

  selectOwn(account){
    this.sourceAccountId = account;
  }

  selectThird(account){
    this.account_id_destination = account;
  }

}
