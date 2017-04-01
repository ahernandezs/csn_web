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
		let body = res.json();
	    localStorage.setItem('x-auth-token', res.headers.get("X-AUTH-TOKEN"));
		return body;
	}

	public extractData(res: Response){
		return res.json();
	}

	public handleError(error: Response | any){
		return Promise.reject(error);
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
			if(t === 1){
				this.broadcaster.broadcast('timeout',t);
			}
			if(t === 30){
				this.broadcaster.broadcast('timeout',t);
			}
			if(t === 60){
				this.broadcaster.broadcast('timeout',t);
			}
			if(t === 90){
				this.broadcaster.broadcast('timeout',t);
			}
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