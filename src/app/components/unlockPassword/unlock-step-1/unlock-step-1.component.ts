import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { DOT } from '../../../utils/dot';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';

@Component({
  selector: 'app-unlock-step-1',
  templateUrl: './unlock-step-1.component.html',
  styleUrls: ['./unlock-step-1.component.sass']
})
export class UnlockStep1Component {

  constructor(
    private loginService: LoginService,
    private dot: DOT
  ) {}

  preregisterResponse: PreregisterResponse;
  preregisterRequest: PreregisterRequest = new PreregisterRequest('', '');

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  changeView(view: String): void {
    this.loginService.unlockPasswordPreRequest(this.preregisterRequest).subscribe(
      response => {
        this.preregisterResponse = response;
        this.dot.setData([this.preregisterResponse, this.preregisterRequest]);
        this.routeView.emit(view);
      },
      err => {
        console.log(err);
      }
    );  }

  showPass(elementToShow: string){
    let pwd = document.getElementById(elementToShow);
        if(pwd.getAttribute("type")=="password"){
            pwd.setAttribute("type","text");
        } else {
            pwd.setAttribute("type","password");
        }
    }

}