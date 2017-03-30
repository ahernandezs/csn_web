import { Injectable } from '@angular/core';
import { HttpClient } from './http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Utils } from '../utils/utils';

import { ActivateThirdAccountRequest } from '../models/activate-third-account-request';
import { ActivateThirdAccountResponse } from '../models/activate-third-account-response';
import { ThirdAccount } from '../models/third-account';

@Injectable()
export class ThirdAccountService {

	private headers;

	constructor(
		private http: HttpClient,
		private utils: Utils
	) {	}

	activateThirdAccount(activateThirdAccountRequest: ActivateThirdAccountRequest): Observable<ActivateThirdAccountResponse>{
		return this.http.post(environment.baseURL + '/externalaccounts/activate', activateThirdAccountRequest, true)
			.map(this.utils.extractData)
			.catch(this.utils.handleError);
	}

	getThirdAccounts(): Observable<Array<ThirdAccount>>{
		return this.http.get(environment.baseURL + 'externalaccounts', true)
			.map(res => res.json().third_accounts)
			.catch(this.utils.handleError);
	}

}