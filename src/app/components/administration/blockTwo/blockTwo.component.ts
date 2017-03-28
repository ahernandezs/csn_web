import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { UpdatePasswordRequest } from '../../../models/update-password-request';
import { BlockUserRequest } from '../../../models/block-user-request';

@Component({
  selector: 'app-blockTwo',
  templateUrl: './blockTwo.component.html',
  styleUrls: ['./blockTwo.component.sass']
})
export class BlockTwoComponent {
  block2Form : FormGroup;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ) {this.validations(); }

  old_password = "";
  new_password = "";
  verify_password = "";

  @Output() routeView2: EventEmitter<String> = new EventEmitter();

  changeView(view: String): void {
      this.routeView2.emit(view);
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

  block(){
    let blockUserRequest = new BlockUserRequest(localStorage.getItem("user_login_csn"));
    this.loginService.blockUser(blockUserRequest).subscribe(
      response => {
        console.log("Avisar que sí se pudo bloquear");
      },
      error => {
        console.log("Error al bloquear");
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
