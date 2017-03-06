import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service'
import { Accounts } from '../../../models/accounts';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  accounts: Array<Accounts>;

  ngOnInit( ) {
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