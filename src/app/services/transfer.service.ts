import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TransferRequest } from '../models/transfer-request';
import { TransferResponse } from '../models/transfer-response';

@Injectable()
export class TransferService {

	private headers;
	private options;

	constructor(
		private http: Http
	) {
		this.headers = new Headers({ 'X-AUTH-TOKEN': 'eltoquen123', 'X-BANK-TOKEN': environment.xbanktoken, 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'});
		this.options =  new RequestOptions({ headers: this.headers });
	}

	transfer(sourceAccountId: string, transferRequest: TransferRequest): Observable<TransferResponse>{
		return this.http.post(environment.baseURL + '/accounts/'+sourceAccountId+'/transactions', transferRequest, this.options)
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