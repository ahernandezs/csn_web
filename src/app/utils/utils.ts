import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Broadcaster } from './broadcaster';
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
		private broadcaster: Broadcaster
	){
		this.timer = Observable.timer(environment.timeout-1000,1000);
	}

	public extractDataAndToken(res: Response){
		if(typeof(this.broadcaster) != 'undefined')
			this.broadcaster.broadcast('clear');
		console.log('aquí se supone que se cierra el loader data y toquen');
		let body = res.json();
	    localStorage.setItem('x-auth-token', res.headers.get("X-AUTH-TOKEN"));
		return body;
	}

	public extractData(res: Response){
		if(typeof(this.broadcaster) != 'undefined')
			this.broadcaster.broadcast('clear');
		console.log('aquí se supone que se cierra el loader data');
		return res.json();
	}

	public handleError(error: Response | any){
		let errMsg: String;
		console.log('Status del error: '+ error.status);
		console.log('Error en utils.ts: '+ JSON.stringify(error));
		console.log('aquí se supone que se cierra el loader error');
		if(typeof(this.broadcaster) != 'undefined')
			this.broadcaster.broadcast('clear');
		return Promise.reject("Error");
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
		this.stopTimer();
		this.subscription = this.timer.subscribe(t => {
			this.timeout = Math.floor((120-t) / 60) + ':' + ((((120-t)%60) > 9) ? ((120-t)%60) : '0'+((120-t)%60));
			this.broadcaster.broadcast('timeout',this.timeout);
			if(t === 120){
				if(localStorage.getItem('x-auth-token') !== null){
					this.http.get(environment.baseURL + 'logout', this.getHeader()).subscribe();
				}
				this.subscription.unsubscribe();
				this.router.navigate(['/login']);
			}
		});
	}

	public stopTimer(){
		if(this.subscription != null ){
			this.subscription.unsubscribe();
		}
	}

}