import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ActivateThirdAccountRequest } from '../models/activate-third-account-request';
import { ActivateThirdAccountResponse } from '../models/activate-third-account-response';
import { ThirdAccount } from '../models/third-account';

@Injectable()
export class ThirdAccountService {

	private headers;
	private options;

	constructor(
		private http: Http
	) {
		this.headers = new Headers({ 'X-AUTH-TOKEN': 'eltoquen123', 'X-BANK-TOKEN': environment.xbanktoken, 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'});
		this.options =  new RequestOptions({ headers: this.headers });
	}

	activateThirdAccount(activateThirdAccountRequest: ActivateThirdAccountRequest): Observable<ActivateThirdAccountResponse>{
		return this.http.post(environment.baseURL + '/externalaccounts/activate', activateThirdAccountRequest, this.options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	getThirdAccounts(): Observable<Array<ThirdAccount>>{
		return this.http.get(environment.baseURL + 'externalaccounts', this.options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response){
		let body = res.json();
		return body || { };
	}

	private handleError(error: Response | any){
		let errMsg: String;
		if(error instanceof Response){
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = "${error.status} - ${error.statusText || ''} ${err}"
		}else{
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Promise.reject(errMsg);
	}

}