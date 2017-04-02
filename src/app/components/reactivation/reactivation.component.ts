import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reactivation',
  templateUrl: './reactivation.component.html',
  styleUrls: ['./reactivation.component.sass']
})
export class ReactivationComponent {

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

    changeViewHandler(view: String) {
        this.myUrl = view;
    }
}