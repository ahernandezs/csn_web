import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThirdAccount } from '../../models/third-account';

@Component({
  selector: 'app-activateAccount',
  templateUrl: './activateAccount.component.html',
  styleUrls: ['./activateAccount.component.sass']
})
export class ActivateAccountComponent {

    private myUrl:any;
    private thirdAccount: ThirdAccount;

    constructor(private route: ActivatedRoute) {
      this.route.url.subscribe(
          (data: any) => {
              for (let i of data) {
                  this.myUrl = i.path;
              }
          },
          (error: any) => console.debug("Error getting the path", error));
    }

    changeViewHandler(thirdAccount: ThirdAccount) {
        this.thirdAccount = thirdAccount;
        this.myUrl = "activateAccountStepOne";
    }

    changeView(view: string) {
        this.myUrl = view;
    }

}