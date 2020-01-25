import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  mostrarMensaje(mensaje: string, tipoMensaje: string){
    var divMensaje = <HTMLDivElement>document.getElementById('alert-message');
    var textoMensaje = <HTMLDivElement>document.getElementById('text-mensaje');
    divMensaje.style.display = "block";
    divMensaje.classList.remove(tipoMensaje =="success" ? 'alert-danger' : 'alert-success');
    divMensaje.className += " alert-" + tipoMensaje + " ";
    textoMensaje.innerHTML = mensaje;  
  }
}
