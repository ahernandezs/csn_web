import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transfer-step-1',
  templateUrl: './transfer-step-1.component.html',
  styleUrls: ['./transfer-step-1.component.sass']
})
export class TransferStep1Component implements OnInit {
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

    ngOnInit() {
    }

    /**
    * Event handler for changing the current view.
    * @param view String
    */
    changeViewHandler(view: String) {
        this.myUrl = view;
    }
}
