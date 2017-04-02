import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-changePassStepOne',
  templateUrl: './changePassStepOne.component.html',
  styleUrls: ['./changePassStepOne.component.sass']
})
export class ChangePassStepOneComponent {

  constructor() { }

  @Output() routeView: EventEmitter<String> = new EventEmitter();

  changeView(view: String): void {
      this.routeView.emit(view);
  }
}
