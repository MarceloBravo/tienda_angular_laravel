import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { datosVenta } from '../interfaces/datosVenta';
import { ItemCarrito } from 'src/app/class/item-carrito';
import { UserLoggedInData } from 'src/app/interfaces/userLogguedInData';
import { PayPalTransactionInterface } from '../interfaces/PayPalTransactionInterface';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private endPoint: string = "http://127.0.0.1:8000/api/";
  private datosVenta: datosVenta = {
    numeroDocumento: null,
    codigoOrden: null,
    tipo_documento: null,
    datosCliente: null,
    carrito: Array(),
    PayPalData: null,
    subtotal: 0,
    shipping: 0,
    descuento: 0,
    user_id: null,
    estado_id: null,
    total: null    
  }


  constructor(private httpClient: HttpClient) { }

  private getHeaders(){
    var headers = new HttpHeaders({'Content-Type':'application/json'});
    return headers;
  }
  
  //SETERS
  setDatosVenta(datos: datosVenta){
    this.datosVenta = datos;
  }

  setNumeroDocumento(numero: number){
    this.datosVenta.numeroDocumento = numero;
  }

  setCodigoOrden(codigo: string){
    this.datosVenta.codigoOrden = codigo;
  }

  setTipoDocumento(tipo: string){
    this.datosVenta.tipo_documento = tipo;
  }

  setDatosCliente(datosCliente: UserLoggedInData){
    this.datosVenta.datosCliente = datosCliente;
  }

  setPayPalData(PayPalData: PayPalTransactionInterface){
    this.datosVenta.PayPalData = PayPalData;
  }

  setsubtotal(subtotal: number){
    this.datosVenta.subtotal = subtotal;
  }

  setShipping(shipping: number){
    this.datosVenta.shipping = shipping;
  }

  setDescuento(descuento: number){
    this.datosVenta.descuento = descuento;
  }

  setUserId(userId: number){
    this.datosVenta.user_id = userId;
  }
  
  setEstadoId(estadoId: number){
    this.datosVenta.estado_id = estadoId;
  }


  //GETERS
  setCarrito(carrito:  {[id: number]: ItemCarrito}){
    this.datosVenta.carrito = carrito;
  }

  getDatosVenta(){
    return this.datosVenta;
  }

  getCarrito(){
    return this.datosVenta.carrito;
  }

  getNumeroDocumento(){
    return this.datosVenta.numeroDocumento;
  }

  getCodigoOrden(){
    return this.datosVenta.codigoOrden;
  }

  getTipoDocumento(){
    return this.datosVenta.tipo_documento;
  }

  getDatosCliente(){
    return  this.datosVenta.datosCliente;
  }

  getPayPalData(){
    return this.datosVenta.PayPalData;
  }
  
  getsubtotal(){
    return this.datosVenta.subtotal;
  }

  getShipping(){
    return this.datosVenta.shipping;
  }

  getDescuento(){
    return this.datosVenta.descuento;
  }

  getUserId(){
    return this.datosVenta.user_id;
  }
  
  getEstadoId(){
    return this.datosVenta.estado_id;
  }


  //Consumiendo servicios
  getLastOrder(){
    return this.httpClient.get(this.endPoint + "ultima-orden");
  }

  save(datosVenta: datosVenta){
    return this.httpClient.post(this.endPoint + 'ordenes', datosVenta, {headers: this.getHeaders()});
  }

  get(id: number){
    return this.httpClient.get(this.endPoint + 'ordenes/' + id);
  }
}
