import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cerrarMessageModal(){
    var divModalMessage = <HTMLDivElement>document.getElementById('modal-message');
    divModalMessage.style.display = "none"
  }
  
}
