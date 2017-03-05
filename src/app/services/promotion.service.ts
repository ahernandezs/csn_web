import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Utils } from '../utils/utils';

import { Promotion } from '../models/promotion';

@Injectable()
export class PromotionService {

	private options;

	constructor(
		private http: Http,
		private utils: Utils
	) {
		this.options = this.utils.getHeader();
	}

	getPromotions(): Observable<Array<Promotion>>{
		return this.http.get(environment.baseURL + 'promotions', this.options)
			.map(res => res.json().promotions)
			.catch(this.utils.handleError);
	}

}