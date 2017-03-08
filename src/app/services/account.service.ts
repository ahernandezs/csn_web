import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Utils } from '../utils/utils';

import { Accounts } from '../models/accounts';
import { Movements } from '../models/movements';

@Injectable()
export class AccountService {

	private options;

	constructor(
		private http: Http,
		private utils: Utils
	) {
		this.options = this.utils.getHeader();
	}

	getAccounts(): Observable<Array<Accounts>>{
		return this.http.get(environment.baseURL + 'accounts', this.utils.getHeader())
			.map(res => res.json().accounts)
			.catch(this.utils.handleError);
	}

	getTransactions(id: string): Observable<Array<Movements>>{
		return this.http.get(environment.baseURL + 'accounts/'+ id +'/transactions', this.utils.getHeader())
			.map(this.utils.extractData)
			.catch(this.utils.handleError);
	}

}