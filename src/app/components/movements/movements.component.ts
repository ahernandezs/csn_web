import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import { Movements } from '../../models/movements';
import { ActivatedRoute } from '@angular/router';
import { MovementsTableComponent } from './movements-table/movements-table.component';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.sass']
})
export class MovementsComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  movementsParent: any = {};
  account = "";
  name = "";
  balance ="";

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.account = params['id'];
      this.name = params['name'];
      this.balance = params['balance'];
      this.accountService.getTransactions(this.account).subscribe(
        response => {
          this.movementsParent = response;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

}
