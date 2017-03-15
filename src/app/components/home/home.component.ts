import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import { Accounts } from '../../models/accounts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit{

  constructor(
    private accountService: AccountService
  ) { }

  accounts: Array<Accounts>;
  opt;

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
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  change(opt){
    this.opt = opt;
  }


}

