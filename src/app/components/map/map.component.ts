import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  signed: boolean;
  lat: number = 19.432608;
  lng: number = -99.133209;
  branches: Array<any>;

  constructor(
    private mapService: MapService
  ){}

	ngOnInit() {
    this.signed = localStorage.getItem('x-data-csn') === null ? false : true;
    //get all branches
    this.mapService.getGeoLocation().subscribe(
      response => {
        this.branches = response;
        for(let i = 0; i < this.branches.length; i++){
          console.log("sucursal "+i+": "+JSON.stringify(this.branches[i]));
        }
      },
      err => {
        console.log(err);
      }
    );
	}

}
