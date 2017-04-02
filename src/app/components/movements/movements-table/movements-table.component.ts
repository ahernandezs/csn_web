import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AccountService } from '../../../services/account.service'
import { Movements } from '../../../models/movements';
import { ActivatedRoute } from '@angular/router';
import { Error } from '../../../models/error';

@Component({
  selector: 'app-movements-table',
  inputs: ['movements'],
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.sass']
})
export class MovementsTableComponent implements OnInit {

  error: Error;
  movements: Array<Movements> = new Array<Movements>();
  account = "";
  @ViewChild('input')
  input: ElementRef;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {
    this.error = new Error(false, '');
  }

  ngOnInit() {
    let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
    eventObservable.subscribe();
    this.route.params.subscribe(params => {
      this.account = params['id'];
      this.accountService.getTransactions(this.account).subscribe(
        response => {
          this.movements = response;
        },
        error => {
            this.error.message = error;
            this.error.show = true;
        }
      );
    });
  }

}
