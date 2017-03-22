import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Utils } from '../utils/utils';

@Injectable()
export class HttpClient {

    constructor(
        private http: Http,
        private utils: Utils
    ) {}

  get(url: string, token: boolean) {
    if(token)
      this.utils.startTimer();
    return this.http.get(url, token ? this.utils.getHeader() : this.utils.getHeaderWithOutToken());
  }

  post(url: string, data: any, token: boolean) {
    if(token)
      this.utils.startTimer();
    return this.http.post(url, data, token ? this.utils.getHeader() : this.utils.getHeaderWithOutToken());
  }
}