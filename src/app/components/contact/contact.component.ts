import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  signed: boolean;
	ngOnInit() {
    this.signed = localStorage.getItem('x-data-csn') === null ? false : true;
	}

}
