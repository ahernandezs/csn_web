import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Geolocation } from '../../models/geolocation';
import { Description } from '../../models/description';
import { Coordinates } from '../../models/coordinates';
import { OpeningHours } from '../../models/openingHours';
import { Address } from '../../models/address';
import { Error } from '../../models/error';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit {

  signed: boolean;
  lat: number;
  lng: number;
  branches: Array<Geolocation> = new Array<Geolocation>();
  opt = '1';
  busqueda = '';
  error: Error;

  constructor(
    private mapService: MapService
  ){
    this.error = new Error(false, '');
  }

  innerHeight: any;

	ngOnInit() {

    this.innerHeight = (window.innerHeight - 258) + 'px';

    console.log(this.innerHeight);

    this.signed = localStorage.getItem('x-data-csn') === null ? false : true;

    this.lat = localStorage.getItem('lat') === null ? 25.666667 : Number(localStorage.getItem('lat'));
    this.lng = localStorage.getItem('lng') === null ? -100.316667 : Number(localStorage.getItem('lng'));

    this.mapService.getGeoLocation().subscribe(
      response =>
        this.branches = response,
      error => {
          this.error.message = error;
          this.error.show = true;
      }
    );
	}

}
