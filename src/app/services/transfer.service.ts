import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TransferRequest } from '../models/transfer-request';
import { TransferResponse } from '../models/transfer-response';

import { Utils } from '../utils/utils';

@Injectable()
export class TransferService {

	private headers;
	private options;

	constructor(
		private http: Http,
		private utils: Utils
	) {
		this.options = this.utils.getHeader();
	}


	transfer(sourceAccountId: string, transferRequest: TransferRequest): Observable<TransferResponse>{
		return this.http.post(environment.baseURL + '/accounts/'+sourceAccountId+'/transactions', transferRequest, this.utils.getHeader())
			.map(this.utils.extractData)
			.catch(this.utils.handleError);;
	}

}