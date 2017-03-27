import { Injectable } from '@angular/core';
import { HttpClient } from './http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Utils } from '../utils/utils';

@Injectable()
export class MapService {

	private options;

	constructor(
		private http: HttpClient,
		private utils: Utils
	) {
		this.options = this.utils.getHeader();
	}

}