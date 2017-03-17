import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  signed: boolean;
	ngOnInit() {
    this.signed = localStorage.getItem('x-data-csn') === null ? false : true;
	}

}
