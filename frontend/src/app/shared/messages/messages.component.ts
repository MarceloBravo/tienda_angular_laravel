import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private _mensajesServices: MessagesService
  ) { }

  ngOnInit() {
  }

  cerrar(){
    this._mensajesServices.ocultarMensaje();
  }
}
