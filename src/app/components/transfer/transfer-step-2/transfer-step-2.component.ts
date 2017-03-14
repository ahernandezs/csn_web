import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TransferService } from '../../../services/transfer.service';
import { TransferRequest } from '../../../models/transfer-request';

@Component({
  selector: 'app-transfer-step-2',
  templateUrl: './transfer-step-2.component.html',
  styleUrls: ['./transfer-step-2.component.sass']
})
export class TransferStep2Component implements OnInit {

  constructor(
    private transferService: TransferService
  ) { }

  ngOnInit() {
  }

  sourceAccountId: string;
  account_id_destination: string;
  amount: string;
  concept: string;
  password: string;

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  changeView(view: String): void {
      this.routeView.emit(view);
  }

  transfer(view: String): void{
    let transferRequest = new TransferRequest(this.account_id_destination, this.amount, this.concept, this.password);
    this.transferService.transfer(this.sourceAccountId, transferRequest).subscribe(
      res => {
        console.log('Todo bien');
      },
      err => {
        console.log('Todo mal');
      }
    );
    this.routeView.emit(view);
  }

}
