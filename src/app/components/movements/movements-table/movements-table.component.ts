import { Component, Input } from '@angular/core';
import { Movements } from '../../../models/movements';

@Component({
  selector: 'app-movements-table',
  inputs: ['movements'],
  templateUrl: './movements-table.component.html',
  styleUrls: ['./movements-table.component.sass']
})
export class MovementsTableComponent {

  @Input() movements: any = {};

}
