import { Injectable } from '@angular/core';
import { HttpClient } from './http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Utils } from '../utils/utils';

import { Promotion } from '../models/promotion';

@Injectable()
export class PromotionService {

	constructor(
		private http: HttpClient,
		private utils: Utils
	) { }

	getPromotions(): Observable<Array<Promotion>>{
		return this.http.get(environment.baseURL + 'promotions', true)
			.map(res => res.json().promotions)
			.catch(this.utils.handleError);
	}

}