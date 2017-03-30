import { Injectable } from '@angular/core';
import { HttpClient } from './http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Utils } from '../utils/utils';

@Injectable()
export class MapService {

	constructor(
		private http: HttpClient,
		private utils: Utils
	) { }

	getGeoLocation(lng?, lat?, rad?): Observable<any>{
		var url= '/bankInformation/geolocation'
		if(typeof lng !== 'undefined' && typeof lat !== 'undefined')
			url += '?lng='+lng+'&lat='+lat;
		if(typeof lng !== 'undefined' && typeof lat !== 'undefined' && typeof rad !== 'undefined')
			url += '?lng='+lng+'&lat='+lat+"&distance="+rad;
		return this.http.get(environment.baseURL+url, false)
			.map(res => res.json().geolocations)
			.catch(this.utils.handleError);
	}

}