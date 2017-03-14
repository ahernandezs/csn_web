import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.sass']
})
export class MovementsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  movementsParent: any = {};
  account = "";
  name = "";
  balance ="";

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.account = params['id'];
      this.name = params['name'];
      this.balance = params['balance'];
    });
  }

}
