import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'unlock-password',
  templateUrl: './unlockPassword.component.html',
  styleUrls: ['./unlockPassword.component.sass']
})
export class UnlockPasswordComponent implements OnInit {

    private myUrl:any;

    constructor(private route: ActivatedRoute) {
      this.route.url.subscribe(
          (data: any) => {
              for (let i of data) {
                  this.myUrl = i.path;
              }
          },
          (error: any) => console.debug("Error getting the path", error));
    }

    ngOnInit(){
        this.myUrl = "step-1";
    }

    changeViewHandler(view: String) {
        this.myUrl = view;
    }

}