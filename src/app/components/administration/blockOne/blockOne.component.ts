import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blockOne',
  templateUrl: './blockOne.component.html',
  styleUrls: ['./blockOne.component.sass']
})
export class BlockOneComponent {

  constructor() { }

  @Output() routeView2: EventEmitter<String> = new EventEmitter();

  changeView(view: String): void {
      this.routeView2.emit(view);
  }
}
