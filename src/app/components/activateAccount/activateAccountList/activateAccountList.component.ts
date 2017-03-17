import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThirdAccountService } from '../../../services/third.account.service';
import { ThirdAccount } from '../../../models/third-account';

@Component({
  selector: 'app-activateAccountList',
  templateUrl: './activateAccountList.component.html',
  styleUrls: ['./activateAccountList.component.sass']
})
export class ActivateAccountListComponent implements OnInit {

  thirdAccounts: Array<ThirdAccount>;

  constructor(
       private thirdAccountService: ThirdAccountService
  ) { }

  ngOnInit() {
    this.thirdAccountService.getThirdAccounts().subscribe(
        response => {
            this.thirdAccounts = response;
        },
        error => {
            console.log('Error al traer las cuentas de terceros');
        }
    );
  }

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<ThirdAccount> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  activateAccount(account: ThirdAccount): void {
      this.routeView.emit(account);
  }

}
