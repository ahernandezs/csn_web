import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transfer-step-1-1',
  templateUrl: './transfer-step-1-1.component.html',
  styleUrls: ['./transfer-step-1-1.component.sass']
})
export class TransferStep11Component implements OnInit {

  constructor() { }

  ngOnInit() {
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
