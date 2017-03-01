import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class Utils {
    constructor(){}

	public extractDataAndToken(res: Response){
		let body = res.json();
	    localStorage.setItem('x-auth-token', res.headers.get("X-AUTH-TOKEN"));
		return body || { };
	}

	public extractData(res: Response){
		let body = res.json();
		return body || { };
	}

	public handleError(error: Response | any){
		let errMsg: String;
		errMsg = JSON.stringify(error);
		return Promise.reject("Error en la conexion");
	}

	public getHeader(){
		let headers = new Headers({ 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'), 'X-BANK-TOKEN': environment.xbanktoken, 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'});
		return  new RequestOptions({ headers: headers });
	}

	public getHeaderWithOutToken(){
		let headers = new Headers({'X-BANK-TOKEN': environment.xbanktoken, 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'});
		return new RequestOptions({ headers: headers });
	}

}