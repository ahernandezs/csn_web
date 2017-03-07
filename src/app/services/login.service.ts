import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Utils } from '../utils/utils';

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

	private optionsWithOutToken;
	private options;

	constructor(
		private http: Http,
		private utils: Utils
	) {	}

	checkLogin(checkLoginRequest: CheckLoginRequest): Observable<CheckLoginResponse>{
		return this.http.post(environment.baseURL + 'checkLogin', checkLoginRequest, this.utils.getHeaderWithOutToken())
			.map(this.utils.extractData)
			.catch(this.utils.handleError);
	}

	login(loginRequest: LoginRequest): Observable<LoginResponse>{
		return this.http.post(environment.baseURL + 'login', loginRequest, this.utils.getHeaderWithOutToken())
			.map(this.utils.extractDataAndToken)
			.catch(this.utils.handleError);
	}

	logout(): Observable<any>{
		return this.http.get(environment.baseURL + 'logout', this.utils.getHeader())
			.catch(this.utils.handleError);
	}

	preRegister(preregisterRequest: PreregisterRequest): Observable<PreregisterResponse>{
		return this.http.post(environment.baseURL + 'preregister', preregisterRequest, this.utils.getHeaderWithOutToken())
			.map(this.utils.extractData)
			.catch(this.utils.handleError);
	}

	register(registerRequest: RegisterRequest): Observable<any>{
		return this.http.post(environment.baseURL + 'register', registerRequest, this.utils.getHeader())
			.map(this.utils.extractData)
			.catch(this.utils.handleError);
	}

	updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<any>{
		return this.http.post(environment.baseURL + 'userInformation/password', updatePasswordRequest, this.utils.getHeader())
			.map(this.utils.extractData)
			.catch(this.utils.handleError);
	}

	unlockPasswordPreRequest(unlockPasswordPreRequest: UnlockPasswordPreRequest): Observable<UnlockPasswordPreResponse>{
		return this.http.post(environment.baseURL + 'unlockPasswordPrerequest', unlockPasswordPreRequest, this.utils.getHeader())
			.map(this.utils.extractData)
			.catch(this.utils.handleError);
	}

	unlockPasswordRequest(unlockPasswordRequest: UnlockPasswordRequest): Observable<UnlockPasswordResponse>{
		return this.http.post(environment.baseURL + 'unlockPasswordRequest', unlockPasswordRequest, this.utils.getHeader())
			.map(this.utils.extractData)
			.catch(this.utils.handleError);
	}

}
