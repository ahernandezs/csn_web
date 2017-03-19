import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AccountService } from '../../../services/account.service'
import { Movements } from '../../../models/movements';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movements-table',
  inputs: ['movements'],
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.sass']
})
export class MovementsTableComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  movements: Array<Movements> = new Array<Movements>();
  account = "";

  @ViewChild('input')
  input: ElementRef;

  ngOnInit() {
    let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
    eventObservable.subscribe();
    this.route.params.subscribe(params => {
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
