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
  opt;

  constructor(
       private thirdAccountService: ThirdAccountService
  ) { }

  ngOnInit() {
    this.opt = "UNACTIVATED";
    this.thirdAccountService.getThirdAccounts().subscribe(
        response => {
            this.thirdAccounts = response;
        },
        error => {
            console.log('Error al traer las cuentas de terceros');
        }
    );
  }

  @Output() routeView: EventEmitter<ThirdAccount> = new EventEmitter();

  activateAccount(account: ThirdAccount): void {
      this.routeView.emit(account);
  }

}
