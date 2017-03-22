import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class Utils {

	subscription;
	timer;
    constructor(
		private http: Http,
	    private router: Router,
	){
		this.timer = Observable.timer(environment.timeout,environment.timeout);
	}

	public extractDataAndToken(res: Response){
		let body = res.json();
	    localStorage.setItem('x-auth-token', res.headers.get("X-AUTH-TOKEN"));
		return body;
	}

	public extractData(res: Response){
		return res.json();
	}

	public handleError(error: Response | any){
		let errMsg: String;
		console.log('Status del error: '+ error.status);
		console.log('Error en utils.ts: '+ JSON.stringify(error));
		errMsg = JSON.stringify(error);
		return Promise.reject("Error en la conexion");
	}

	public getHeader(){
		let headers = new Headers({ 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'), 'X-BANK-TOKEN': environment.xbanktoken+'', 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'});
		return  new RequestOptions({ headers: headers });
	}

	public getHeaderWithOutToken(){
		let headers = new Headers({'X-BANK-TOKEN': environment.xbanktoken, 'X-CLIENT-TYPE': 'WEB', 'Content-Type': 'application/json'});
		return new RequestOptions({ headers: headers });
	}

	public startTimer(){
		if(this.subscription != null ){
			this.subscription.unsubscribe();
		}
		this.subscription = this.timer.subscribe(t => {
			if(t === 0){
				console.log('Mandar mensaje de que lo vamos a sacar');
			}else{
				console.log('Fuera!');
				if(localStorage.getItem('x-auth-token') !== null){
					this.http.get(environment.baseURL + 'logout', this.getHeader());
				}
				this.subscription.unsubscribe();
				this.router.navigate(['/login']);
			}
		});
	}

}