import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { CheckLoginRequest } from '../models/check-login-request';
import { CheckLoginResponse } from '../models/check-login-response';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { PreregisterRequest } from '../models/preregister-request';
import { PreregisterResponse } from '../models/preregister-response';
import { RegisterRequest } from '../models/register-request';
import { UpdatePasswordRequest } from '../models/update-password-request';
import { UnlockPasswordPreRequest } from '../models/unlock-password-pre-request';
import { UnlockPasswordPreResponse } from '../models/unlock-password-pre-response';
import { UnlockPasswordRequest } from '../models/unlock-password-request';
import { UnlockPasswordResponse } from '../models/unlock-password-response';

@Injectable()
export class LoginService {

	private headersWithOutToken;
	private optionsWithOutToken;
	private headers;
	private options;

	constructor(
		private http: Http
	) {
		this.headersWithOutToken = new Headers({'X-BANK-TOKEN': environment.xbanktoken, 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'}); //TODO heredar de otra clase los headers para no ponerlo en todos lados
		this.optionsWithOutToken = new RequestOptions({ headers: this.headersWithOutToken });
		this.headers = new Headers({ 'X-AUTH-TOKEN': 'eltoquen123', 'X-BANK-TOKEN': environment.xbanktoken, 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'});
		this.options =  new RequestOptions({ headers: this.headers });
	}

	checkLogin(checkLoginRequest: CheckLoginRequest): Observable<CheckLoginResponse>{
		return this.http.post(environment.baseURL + 'checkLogin', checkLoginRequest, this.optionsWithOutToken)
			.map(this.extractData)
			.catch(this.handleError);
	}

	login(loginRequest: LoginRequest): Observable<LoginResponse>{
		return this.http.post(environment.baseURL + 'login', loginRequest, this.optionsWithOutToken)
			.map(this.extractData)
			.catch(this.handleError);
	}

	logout(): Observable<any>{
		return this.http.get(environment.baseURL + 'logout', this.options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	preRegister(preregisterRequest: PreregisterRequest): Observable<PreregisterResponse>{
		return this.http.post(environment.baseURL + 'preRegister', preregisterRequest, this.options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	register(registerRequest: RegisterRequest): Observable<any>{
		return this.http.post(environment.baseURL + 'register', registerRequest, this.options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<any>{
		return this.http.post(environment.baseURL + 'password', updatePasswordRequest, this.options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	unlockPasswordPreRequest(unlockPasswordPreRequest: UnlockPasswordPreRequest): Observable<UnlockPasswordPreResponse>{
		return this.http.post(environment.baseURL + 'unlockPasswordPrerequest', unlockPasswordPreRequest, this.options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	unlockPasswordRequest(unlockPasswordRequest: UnlockPasswordRequest): Observable<UnlockPasswordResponse>{
		return this.http.post(environment.baseURL + 'unlockPasswordRequest', unlockPasswordRequest, this.options)
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
