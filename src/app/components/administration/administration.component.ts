import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.sass']
})
export class AdministrationComponent {

    private myUrl:any;
    private myUrl2:any = "blockOne";

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
    changeViewHandler2(view: String) {
        this.myUrl2 = view;
    }
}