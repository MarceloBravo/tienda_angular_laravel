import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidaRutService {

  constructor() { }

  public validaRut(rutControl: AbstractControl) {
    return (formGroup: FormGroup) => {      
      return this.validaRut(rutControl.value);
    }
  }


  private validar(rutCompleto: string){
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
        return false;
    var tmp 	= rutCompleto.split('-');
    var digv	= tmp[1]; 
    var rut 	= tmp[0];
    if ( digv === 'K' ) digv = 'k' ;
    return (this.dv(rut).toString() === digv );
  }

  private dv(T: any){
      var M=0,S=1;
      for(;T;T=Math.floor(T/10))
          S=(S+T%10*(9-M++%6))%11;
      return S?S-1:'k';
  }
  
}
