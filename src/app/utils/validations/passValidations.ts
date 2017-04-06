export class PasswordValidator{
   
   static validatePassword(Id,password) {

        var account = localStorage.getItem('user_login_csn');
        let error_message = "";
        if ( password ){
            var repeatChars = /(.)\1{2,}/;
            if ( repeatChars.test(password)){
                error_message = 'No puede repetir más de tres caracteres iguales como 111 o aaa';
            }
            var nameInst = new RegExp('csn','i');
            var nameInst2 = new RegExp('sannicolas','i');
            var nameInstCom = new RegExp('cajasannicolas','i');
            if ( nameInst.test(password) || nameInstCom.test(password) || nameInst2.test(password) ){
                error_message = 'No puedes usar el nombre de la institución como parte de la contraseña';
            }           
            if ( password.length < 8 ){
                error_message = 'La contraseña no debe tener menos de 8 caracteres';
            }
            var user = Id.replace(/^0*/, "");
            var RegExpUser = new RegExp (user,'g'); 
            if( RegExpUser.test(password) ){
                error_message = 'No puede usar su id de usuario como contraseña';
            }
            var messageConsecutive = this.consecutivePassword(password);
            if ( messageConsecutive != "" ){
                error_message = messageConsecutive;
            }
        }
        return error_message; 
    }

    static consecutivePassword(password){
        var error_message2 = "";
        var previousAsciiCode = 0;
        var numSeqcount = 0;
        var asciiCode;

        for(var i = 0; i < password.length; i++) {
            asciiCode = password.charCodeAt(i);
            if((previousAsciiCode + 1) === asciiCode) {
                numSeqcount++;
                if(numSeqcount >= 2) {
                    error_message2 = 'No puedes usar caracteres consecutivos como 123 o abc';
                    break;
                }
            } else {
                numSeqcount = 0;
            }
            previousAsciiCode = asciiCode;
        }
        return error_message2;
    }
}
