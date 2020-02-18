import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(
    private _messagesService: MessagesService
  ) { }

  ngOnInit() {
  }

  busquedaGlobal(){
    var input = <HTMLInputElement>document.getElementById('txt-busqueda-global');    
    this._messagesService.mostrarMensaje(input.value, 'success');
  }
}
