import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Utils } from '../utils/utils';
import { Broadcaster } from '../utils/broadcaster';

@Injectable()
export class HttpClient {

    constructor(
    		private broadcaster: Broadcaster,
        private http: Http,
        private utils: Utils
    ) {}

  get(url: string, token: boolean) {
    if(token && !url.includes('logout')){
      this.utils.startTimer();
    }
    if(url.includes('logout')){
      this.utils.stopTimer();
    }
    console.log('aventando el cargador en httpClient get');
		this.broadcaster.broadcast('loader');
    return this.http.get(url, token ? this.utils.getHeader() : this.utils.getHeaderWithOutToken());
  }

  post(url: string, data: any, token: boolean) {
    if(token){
      this.utils.startTimer();
    }
    console.log('aventando el cargador en httpClient post');
		this.broadcaster.broadcast('loader');
    return this.http.post(url, data, token ? this.utils.getHeader() : this.utils.getHeaderWithOutToken());
  }

}