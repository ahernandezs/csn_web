import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckLoginResponse } from '../../models/check-login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

    private myUrl: any = 'login';
    private checkLoginResponse: CheckLoginResponse;

    changeViewHandler(checkLoginResponse: CheckLoginResponse) {
        this.checkLoginResponse = checkLoginResponse;
        this.myUrl = 'confirmation';
    }

    changeViewConfirm(view: string): void{
      this.myUrl = view;
    }

}
