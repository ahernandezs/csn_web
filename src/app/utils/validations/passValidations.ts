export class PasswordValidator{
   
   static validatePassword(password) {

        var account = localStorage.getItem('user_login_csn');
        let error_message = "";
        if ( password ){
            var repeatChars = /(.)\1{2,}/;
            if ( repeatChars.test(password)){
                error_message = 'No puede repetir más de tres caracteres iguales como 111 o aaa';
            }
            var nameInst = new RegExp('csn','i');
            if ( nameInst.test(password) ){
                error_message = 'No puedes usar el nombre de la institución como parte de la contraseña';
            }
            var userName = new RegExp(account,'g');
            if ( userName.test(password) ){
                error_message = 'No puede usar su id de usuario como contraseña';
            }
        }
        return error_message; 
    }

    static consecutivePassword(password){
        var previousAsciiCode = 0;
        var numSeqcount = 0;
        var asciiCode;
        var error_message = "";

        for(var i = 0; i < password.length; i++) {
            asciiCode = password.charCodeAt(i);
            if((previousAsciiCode + 1) === asciiCode) {
                numSeqcount++;
                if(numSeqcount >= 2) {
                    error_message = 'No puedes usar caracteres consecutivos como 123 o abc';
                    break;
                }
            } else {
                numSeqcount = 0;
            }
            previousAsciiCode = asciiCode;
        }
        return error_message;
    }

    static lengthPassword (password){
        var error_message = "";
        if ( password.length < 8 ){
            error_message = 'La contraseña no debe tener menos de 8 caracteres';
        }
        return error_message;
    }
}