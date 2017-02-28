import { Injectable } from '@angular/core';

@Injectable()
export class DOT {
    constructor(){}
	public data: Array<any>;
	public setData(new_data: Array<any>){
		this.data = new_data;
	}

}