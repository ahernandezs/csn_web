import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { UpdatePasswordRequest } from '../../../models/update-password-request';

@Component({
  selector: 'app-changePassStepTwo',
  templateUrl: './changePassStepTwo.component.html',
  styleUrls: ['./changePassStepTwo.component.sass']
})
export class ChangePassStepTwoComponent implements OnInit {
  changePassForm : FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ) {this.validations(); }

  old_password = "";
  new_password = "";
  verify_password = "";
  dataForUser;
  account;

  @Output() routeView: EventEmitter<String> = new EventEmitter();

	ngOnInit() {
		this.dataForUser = JSON.parse(localStorage.getItem('x-data-csn'));
    this.account = localStorage.getItem('user_login_csn');
	}

  changeView(view: String): void {
      this.routeView.emit(view);
  }

  changePassword(){

    if(this.new_password !== this.verify_password){
      console.log("Decir que las contraseñas no coinciden"+this.new_password +" / "+this.verify_password);
      return;
    } 

    //TODO: validar el password antiguo

    let updatePasswordRequest = new UpdatePasswordRequest(this.new_password);

    this.loginService.updatePassword(updatePasswordRequest).subscribe(
      response => {
        console.log("Avisar que sí se pudo hacer el cambio: "+response);
        alert('cambio exitoso');
      },
      error => {
        console.log("Mandar mensaje de error: "+error);
      }
    );
  }

  validations(){
    this.changePassForm = this.fb.group({
      old_password:['',Validators.required],
      new_password:['',Validators.required],
      verify_password: ['',Validators.required]
    })
  }
}
