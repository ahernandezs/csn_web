import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThirdAccountService } from '../../../services/third.account.service';

@Component({
  selector: 'app-transfer-step-1',
  templateUrl: './transfer-step-1.component.html',
  styleUrls: ['./transfer-step-1.component.sass']
})
export class TransferStep1Component implements OnInit {

  constructor(
    private thirdAccountService: ThirdAccountService
  ) { }

  thirdAccounts;

  ngOnInit() {
    this.thirdAccountService.getThirdAccounts().subscribe(
      response => {
        this.thirdAccounts = response;
      },
      error => {
        console.log('Error al traer las cuentas de terceros');
      }
    );
  }

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
}
