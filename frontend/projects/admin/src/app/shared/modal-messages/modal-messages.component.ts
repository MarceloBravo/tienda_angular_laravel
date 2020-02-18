import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-messages',
  templateUrl: './modal-messages.component.html',
  styleUrls: ['./modal-messages.component.css']
})
export class ModalMessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cerrarMessageModal(){
    var divModal = <HTMLDivElement>document.getElementById('modal-message');
    var divTitle = <HTMLDivElement>document.getElementById('modal-message-title');
    var divMessage = <HTMLDivElement>document.getElementById('modal-message-message');    
    divTitle.innerHTML = '';
    divMessage.innerHTML = '';
    divModal.style.display = 'none';
  }
  
}
