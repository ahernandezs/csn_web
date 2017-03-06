import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../models/promotion';

@Component({
  selector: 'app-contact',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.sass']
})
export class PromotionsComponent implements OnInit {

  constructor(
        private promotionService: PromotionService
  ) { }

  promotions: Array<any> = new Array();

  ngOnInit() {
    this.promotionService.getPromotions().subscribe(
      response => {
         let row: Array<any>;
         for(var i = 0; i <= response.length; i++){
            if(i%3 === 0 ){
              if(i!==0){
                this.promotions.push(row);
              }
              row = new Array();
            }
            row.push(response[i])
         }
      },
      err => {
        console.log(err);
      }
    );
  }

}
