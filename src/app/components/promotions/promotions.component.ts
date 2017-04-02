import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../models/promotion';
import { Broadcaster } from '../../utils/broadcaster';
import { Error } from '../../models/error';

@Component({
  selector: 'app-contact',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.sass']
})
export class PromotionsComponent implements OnInit {

  error: Error;
  promotions: Array<any> = new Array();

  constructor(
        private promotionService: PromotionService,
        private broadcaster: Broadcaster
  ) {
    this.error = new Error(false, '');
  }

  ngOnInit() {
		this.broadcaster.broadcast('loader');
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
      error => {
          this.error.message = error;
          this.error.show = true;
      },
      () => {this.broadcaster.broadcast('clear')}
    );
  }

}
