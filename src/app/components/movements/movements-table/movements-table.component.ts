import { Component, OnInit, Input } from '@angular/core';
import { Movements } from '../../../models/movements';

@Component({
  selector: 'app-movements-table',
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.sass']
})
export class MovementsTableComponent implements OnInit {

  constructor() { }

  @Input() movements: Array<Movements>;

  ngOnInit() {

    console.log("movimientos desde el padre: "+this.movements);

  }

}
