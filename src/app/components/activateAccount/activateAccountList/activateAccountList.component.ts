import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThirdAccountService } from '../../../services/third.account.service';
import { ThirdAccount } from '../../../models/third-account';
import { Error } from '../../../models/error';

@Component({
  selector: 'app-activateAccountList',
  templateUrl: './activateAccountList.component.html',
  styleUrls: ['./activateAccountList.component.sass']
})
export class ActivateAccountListComponent implements OnInit {

  thirdAccounts: Array<ThirdAccount>;
  opt;
  error: Error;
  @Output() routeView: EventEmitter<ThirdAccount> = new EventEmitter();

  constructor(
       private thirdAccountService: ThirdAccountService
  ) {
    this.error = new Error(false, '');
  }

  ngOnInit() {
    this.opt = "ACTIVATED";
    this.thirdAccountService.getThirdAccounts().subscribe(
        response => {
            this.thirdAccounts = response;
            this.error.show = false;
        },
        error => {
            this.error.message = error;
            this.error.show = true;
          }
    );
  }

  activateAccount(account: ThirdAccount): void {
      if(account.status === 'DEACTIVATED'){
        this.routeView.emit(account);
      }
  }

}
