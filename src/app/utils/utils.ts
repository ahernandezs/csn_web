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
	timeout;

    constructor(
		private http: Http,
	    private router: Router,
	){
		this.timer = Observable.timer(environment.timeout-1000,1000);
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
			this.timeout = Math.floor((120-t) / 60) + ':' + ((((120-t)%60) > 9) ? ((120-t)%60) : '0'+((120-t)%60));
			//TODO usar una ventana modal bonita
			console.log('tu sesión terminará en: '+ this.timeout);
			if(t === 120){
				if(localStorage.getItem('x-auth-token') !== null){
					this.http.get(environment.baseURL + 'logout', this.getHeader()).subscribe();
				}
				this.subscription.unsubscribe();
				console.log('fuera por inactividad');
				this.router.navigate(['/login']);
			}
		});
	}

}