import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.sass']
})
export class MovementsComponent implements OnInit {

  movementsParent: any = {};
  account = "";
  name = "";
  balance ="";

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.account = params['id'];
      this.name = params['name'];
      this.balance = params['balance'];
    });
  }

}
