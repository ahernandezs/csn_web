import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { UpdatePasswordRequest } from '../../../models/update-password-request';
import { Error } from '../../../models/error';
import { PasswordValidator } from '../../../utils/validations/passValidations';

@Component({
  selector: 'app-changePassStepTwo',
  templateUrl: './changePassStepTwo.component.html',
  styleUrls: ['./changePassStepTwo.component.sass']
})
export class ChangePassStepTwoComponent implements OnInit {

  error: Error;
  changePassForm : FormGroup;
  old_password = "";
  new_password = "";
  verify_password = "";
  dataForUser;
  account;
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.error = new Error(false, '');
    this.validations();
  }

	ngOnInit() {
		this.dataForUser = JSON.parse(localStorage.getItem('x-data-csn'));
    this.account = localStorage.getItem('user_login_csn');
	}

  changeView(view: String): void {
      this.routeView.emit(view);
  }

  changePassword(){
    var validation = PasswordValidator.validatePassword(this.account,this.new_password);
    if ( validation != ""){
      this.error.show = true;
      this.error.message = validation;
      return;
    } else if(this.new_password !== this.verify_password){
      this.error.message = "Las contraseñas no coinciden";
      this.error.show = true;
      return;
    } else {
      let updatePasswordRequest = new UpdatePasswordRequest(this.new_password);

      this.loginService.updatePassword(updatePasswordRequest).subscribe(
        response => {
          alert('Cambio exitoso');
          this.error.show = false;
        },
          error => {
              this.error.message = error;
              this.error.show = true;
          }
      );
    }
  }

  validations(){
    this.changePassForm = this.fb.group({
      old_password:['',Validators.required],
      new_password:['',Validators.required],
      verify_password: ['',Validators.required]
    })
  }
}
