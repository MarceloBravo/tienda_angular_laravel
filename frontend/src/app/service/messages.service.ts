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

  showModalMessage(titulo: string, mensaje: string){
    var divModalMessage = <HTMLDivElement>document.getElementById('modal-message');
    var divTituloModalMessage = <HTMLDivElement>document.getElementById('modal-message-title');
    var divMensajeModalMessage = <HTMLDivElement>document.getElementById('modal-message-message');
    divModalMessage.style.display = "block";
    divTituloModalMessage.innerHTML = titulo;
    divMensajeModalMessage.innerHTML =mensaje;
  }
}
