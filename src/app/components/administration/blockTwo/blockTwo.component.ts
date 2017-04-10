import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { UpdatePasswordRequest } from '../../../models/update-password-request';
import { BlockUserRequest } from '../../../models/block-user-request';
import { Error } from '../../../models/error';

@Component({
  selector: 'app-blockTwo',
  templateUrl: './blockTwo.component.html',
  styleUrls: ['./blockTwo.component.sass']
})
export class BlockTwoComponent implements OnInit {

  error: Error;
  block2Form : FormGroup;
  old_password = "";
  new_password = "";
  verify_password = "";
  dataForUser;
  account;
  @Output() routeView2: EventEmitter<String> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.error = new Error(false, '');
    this.validations();
  }

	ngOnInit() {
		this.dataForUser = JSON.parse(localStorage.getItem('x-data-csn'));
    this.account = localStorage.getItem('user_login_csn').replace(/^0*/, "");    
	}

  changeView(view: String): void {
      this.routeView2.emit(view);
  }

  block(){
    let blockUserRequest = new BlockUserRequest(localStorage.getItem("user_login_csn"));
    this.loginService.blockUser(blockUserRequest).subscribe(
      response => {
        this.error.show = false;
        alert('Bloqueo exitoso');
      },
        error => {
            this.error.message = error;
            this.error.show = true;
        }
    );
  }

  validations(){
    this.block2Form= this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      verify_password: ['', Validators.required]
    })
  }
}
