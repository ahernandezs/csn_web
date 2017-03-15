import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

function checkLetters(c:AbstractControl) {
    if ( c.value == null ) return null;
    var number = /[a-z A-Z]/;
    if( number.test(c.value) ){
        return {noLetters: true}
    }
    return null;  
}

@Directive({
    selector: '[no-letters]',
    providers:[ 
        { provide:NG_VALIDATORS, multi: true, useValue: checkLetters }
    ]
})

export class OnlyNumbers{ } 