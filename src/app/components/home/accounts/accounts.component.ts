import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service'
import { Accounts } from '../../../models/accounts';
import { DOT } from '../../../utils/dot';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private dot: DOT
  ) { }

  accounts: Array<Accounts>;
  dataForUser;

  ngOnInit( ) {

    this.dataForUser = this.dot.data[0];

    this.accountService.getAccounts().subscribe(
      response => {
        this.accounts = response;
      },
      err => {
        console.log(err);
      }
    );
  }

}