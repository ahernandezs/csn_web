import { Component, Input } from '@angular/core';
import { AccountService } from '../../../services/account.service'
import { Movements } from '../../../models/movements';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movements-table',
  inputs: ['movements'],
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.sass']
})
export class MovementsTableComponent {

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  movements: Array<Movements> = new Array<Movements>();
  account = "";

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.account = params['id'];
      this.accountService.getTransactions(this.account).subscribe(
        response => {
          this.movements = response;
          console.log(this.movements);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

}
