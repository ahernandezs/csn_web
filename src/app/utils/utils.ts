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
	timeout: string;

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

		let errorMessage = 'Ocurrió un error';
		if(error.status === 401){
			errorMessage = 'Sesión inválida';
		}
		if(error.status === 403){
			errorMessage = 'Datos incorrectos';
			let cod = JSON.parse(error._body);
			if(cod.code === 304) errorMessage = 'El cliente está reseteado en el KBA';

		}
		if(error.status === 406){
			errorMessage = 'Datos inválidos';
			let cod = JSON.parse(error._body);
			if(cod.code === 301) errorMessage = 'La contraseña no cumple con las medidas de seguridad';
			if(cod.code === 312) errorMessage = 'Introduzca un número de usuario';
			if(cod.code === 403) errorMessage = 'Formato de número de cuenta inválido';

		}
		if(error.status === 417){
			errorMessage = 'Formato de datos inválido';
			let cod = JSON.parse(error._body);
			if(cod.code === 100) errorMessage = 'Longitud incorrecta';
			if(cod.code === 101) errorMessage = 'Introduzca la longitud';
			if(cod.code === 200) errorMessage = 'Latitud incorrecta';
			if(cod.code === 101) errorMessage = 'Introduzca la latitud';
			if(cod.code === 300) errorMessage = 'Formato inválido de la distancia';
			if(cod.code === 400) errorMessage = 'Formato inválido de coordenadas';
			if(cod.code === 401) errorMessage = 'Número inválido de coordenadas';
		}

		if(error.status === 423){
			errorMessage = 'El usuario está bloqueado';
		}
		if(error.status === 500){
			errorMessage = 'Ocurrió un error en la lógica del negocio';
			let cod = JSON.parse(error._body);
			if(cod.code === 92) errorMessage = 'Folio incorrecto';
			if(cod.code === 95) errorMessage = 'Sucursal cerrada';
		}
		if(error.status === 503){
			errorMessage = 'Error técnico';
			let cod = JSON.parse(error._body);
			if(cod.code === 101) errorMessage = 'Cliente no encontrado';
			if(cod.code === 109) errorMessage = 'No se pudo realizar el cambio de estatus';
			if(cod.code === 110) errorMessage = 'No se encontró ninguna cuenta asociada con el código de activación';
			if(cod.code === 111) errorMessage = 'La cuenta ya está activada';
			if(cod.code === 112) errorMessage = 'El código de activación no es válido';
			if(cod.code === 114) errorMessage = 'No se encontró ninguna cuenta asociada al cliente';
			if(cod.code === 115) errorMessage = 'Se excedió el límite máximo de transferencias';
			if(cod.code === 116) errorMessage = 'No se pudo guardar la transacción';
			if(cod.code === 201) errorMessage = 'El código de activación no es válido';
			if(cod.code === 202) errorMessage = 'Número de cliente no disponible';
			if(cod.code === 203) errorMessage = 'El usuario ya está activado';
			if(cod.code === 204) errorMessage = 'El número de cliente no está registrado';
			if(cod.code === 205) errorMessage = 'El número de cliente no se encontró en CSN';
			if(cod.code === 206) errorMessage = 'Error desconocido';
			if(cod.code === 301) errorMessage = 'Falta seleccionar la imagen';
			if(cod.code === 302) errorMessage = 'Error al desbloquear usuario';
			if(cod.code === 303) errorMessage = 'El usuario no existe';
			if(cod.code === 304) errorMessage = 'Error al consultar el usuario en el KBA';
			if(cod.code === 305) errorMessage = 'Error al obtener las imagenes';
			if(cod.code === 306) errorMessage = 'Usuario no activo';
			if(cod.code === 307) errorMessage = 'Usuario bloqueado en el KBA';
			if(cod.code === 308) errorMessage = 'Error al registrar el usuario en el KBA';
			if(cod.code === 309) errorMessage = 'Error al actualizar la imagen del usuario en el KBA';
			if(cod.code === 310) errorMessage = 'Error al verificar la imagen del cliente';
			if(cod.code === 311) errorMessage = 'El usuario está bloqueado';
			if(cod.code === 313) errorMessage = 'El usuario ya existe, está bloquedado o está reseteado';
			if(cod.code === 401) errorMessage = 'Error en los servicios bancarios'; //El tipo de cuenta origen no puede realizar transferncias
			if(cod.code === 402) errorMessage = 'Usuario inválido';
			if(cod.code === 403) errorMessage = 'Tipo de cuenta inválido';
			if(cod.code === 601) errorMessage = 'El estatus del cliente no concuerda con los casos definidos';
			if(cod.code === 602) errorMessage = 'La operación no existe en el sistema';
			if(cod.code === 603) errorMessage = 'El identificador del cliente ya existe';
			if(cod.code === 604) errorMessage = 'El cliente no se encontró';
			if(cod.code === 605) errorMessage = 'Usuario/contraseña incorrectos';
			if(cod.code === 606) errorMessage = 'Usuario bloqueado en el componente de usuarios';
			if(cod.code === 607) errorMessage = 'Usuario desactivado o borrado';
			if(cod.code === 608) errorMessage = 'Se encontraron varios usuarios con esa misma clave';
			if(cod.code === 609) errorMessage = 'Error desconocido en el componente de usuarios';
			if(cod.code === 610) errorMessage = 'Usuario bloqueado';
		}
		if(error.status === 504){
			errorMessage = 'Tiempo de espera agotado';
		}
		console.log(errorMessage);
		return Promise.reject(errorMessage);
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