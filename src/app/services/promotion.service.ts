import { Injectable } from '@angular/core';
import { HttpClient } from './http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Utils } from '../utils/utils';
import { Broadcaster } from '../utils/broadcaster';

import { Promotion } from '../models/promotion';

@Injectable()
export class PromotionService {

	private options;

	constructor(
		private http: HttpClient,
		private utils: Utils,
		private broadcaster: Broadcaster
	) {
		this.options = this.utils.getHeader();
	}

	getPromotions(): Observable<Array<Promotion>>{
		return this.http.get(environment.baseURL + 'promotions', true)
			.map(res => {
				res.json().promotions;
				if(typeof(this.broadcaster) != 'undefined')
					this.broadcaster.broadcast('clear');	
			})
			.catch(this.utils.handleError);
	}

}