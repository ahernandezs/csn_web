import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import { Accounts } from '../../models/accounts';
import { Error } from '../../models/error';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit{

  error: Error;
  accounts: Array<Accounts>;
  opt;
  
  constructor(
    private accountService: AccountService
  ) {
    this.error = new Error(false, '');
  }

  ngOnInit( ) {
    this.opt = "00"
    this.accountService.getAccounts().subscribe(
      response => {
        this.accounts = response;
        for(let i = 0; i<this.accounts.length; i++){
          this.accountService.getTransactions(this.accounts[i]._account_id).subscribe(
            response => {
              this.accounts[i].lastMovementDate = response[0].date;
              this.accounts[i].lastMovementDescription = response[0].description;
              this.accounts[i].lastMovementAmount = response[0].amount;
            },
              error => {
                  this.error.message = error;
                  this.error.show = true;
              }
          );
        }
      },
        error => {
            this.error.message = error;
            this.error.show = true;
        }
    );
  }

}

