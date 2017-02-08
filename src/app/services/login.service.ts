import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

import { CheckLoginRequest } from '../models/check-login-request';
import { CheckLoginResponse } from '../models/check-login-response';

import { Observable } from 'rxjs/Observable'; //o 'rxjs/Rx'

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {

	constructor(private http: Http) {}

	checkLogin(checkLoginRequest: CheckLoginRequest): Observable<CheckLoginResponse>{

		let headers = new Headers({'X-BANK-TOKEN': environment.xbanktoken, 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'});//TODO heredar de otra clase los headers para no ponerlo en todos lados
		let options = new RequestOptions({ headers: headers });

		return this.http.post(environment.baseURL + 'checkLogin', checkLoginRequest, options)
			.map((res: Response) => res.json())
			.catch( (error: any) => Observable.throw(error.json().error || 'Server error'));

	}

}
