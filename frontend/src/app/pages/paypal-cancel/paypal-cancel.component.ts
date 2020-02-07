import { Component, OnInit } from '@angular/core';
import { ItemCarrito } from '../../class/item-carrito';
import { parse } from 'querystring';

@Component({
  selector: 'app-paypal-cancel',
  templateUrl: './paypal-cancel.component.html',
  styleUrls: ['./paypal-cancel.component.css']
})
export class PaypalCancelComponent implements OnInit {  
  
  constructor() { 
    
  }

  ngOnInit() {
  }

}
