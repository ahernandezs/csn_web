import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

function checkSpace(c:AbstractControl) {
    if ( c.value == null ) return null;
    if( c.value.indexOf(' ') >= 0 ){
        return {noSpace: true}
    }
    return null;  
}

@Directive({
    selector: '[no-space]',
    providers:[ 
        {provide:NG_VALIDATORS, multi: true, useValue: checkSpace}
    ]
})

export class NoSpace{ } 
