import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.sass']
})
export class ActivationComponent implements OnInit {
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