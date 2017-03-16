import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blockOne',
  templateUrl: './blockOne.component.html',
  styleUrls: ['./blockOne.component.sass']
})
export class BlockOneComponent {

  constructor() { }

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView2: EventEmitter<String> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  changeView(view: String): void {
      this.routeView2.emit(view);
  }
}
