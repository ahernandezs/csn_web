import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Geolocation } from '../../models/geolocation';
import { Description } from '../../models/description';
import { Coordinates } from '../../models/coordinates';
import { OpeningHours } from '../../models/openingHours';
import { Address } from '../../models/address';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  signed: boolean;
  lat: number = 25.666667;
  lng: number = -100.316667;
  branches: Array<Geolocation> = new Array<Geolocation>();
  opt = '1';
  busqueda = '';

  constructor(
    private mapService: MapService
  ){}

	ngOnInit() {

    this.signed = localStorage.getItem('x-data-csn') === null ? false : true;

    if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
		}

    this.mapService.getGeoLocation().subscribe(
      response =>
        this.branches = response,
      err => {
        console.log(err);
      }
    );
	}

}
