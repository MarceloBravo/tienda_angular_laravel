import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemCarrito } from 'src/app/class/item-carrito';
import { datosVenta } from '../interfaces/datosVenta';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private endPoint: string = "http://127.0.0.1:8000/api/";  //Url servidor backend
  

  constructor(private httpClient: HttpClient) { }

  private headers(){
    var header = new HttpHeaders({'Content-Type':'application/json'});
    return header;
  }

  paymentPaypal(datosVenta: datosVenta){
    return this.httpClient.post(this.endPoint + 'paypal', datosVenta, {headers: this.headers()});
  }
}
