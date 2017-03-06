import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service'
import { Movements } from '../../models/movements';
import { ActivatedRoute } from '@angular/router';

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

  movements: Array<Movements>;
  account;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.account = params['id'];
      this.accountService.getTransactions(this.account).subscribe(
        response => {
          this.movements = response;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

}
