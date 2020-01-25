import { Injectable } from '@angular/core';
import { ItemCarrito } from '../class/item-carrito';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/productoInterface';
import { Subject, Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { isBuffer } from 'util';
//https://desarrolloweb.com/articulos/practica-observables-angular.html (Practicas de observables en Angular)

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito : {[id: number]: ItemCarrito} = {}; //Crea un diccionario con clave numérica y valor de tipo ItemCarrito
  private carrito$ = new Subject<{[id: number]: ItemCarrito}>();  //Declaración del observable
  private totalCarrito: number = 0;
  private CantitemsCarrito: number = 0;
  private gastosDeEnvio: number = 0;
  private descuento: number = 0;

  constructor(
    private HttpClient: HttpClient,
    private _loginService: LoginService
    ) { }

  //Prepara los datos de un producto para ser agregadop al carrito convirtiendo el producto y cantidad en un item
 agregaItem(producto: ProductoInterface, cantidad: number){
      
      var item: ItemCarrito = new ItemCarrito();
      item.id = producto.id;
      item.producto = producto;
      item.cantidad = cantidad;
      return this.agregarItem(item);
  }

  //Agrega un item al carrito de compras
  private agregarItem(item: ItemCarrito){
    try{
      if(this.carrito[item.id] == undefined){
        this.carrito[item.id] = item;
      }else{
        this.carrito[item.id].cantidad += item.cantidad;
      }
      this.total();
      this.contarItems();      
      this.actualizarPromedioDescuento();
      this.carrito$.next(this.carrito); //Desencadena el evento para que el observable lo detecte
      return true;
    }catch(e){
      return false;
    }
  }

  //Modifica la cantidad de un Item (producto) en el carrito 
  actualizarCantidad(id: number, cantidad: number){    
    this.carrito[id].cantidad = cantidad;
    this.total();
    this.contarItems();
  }

  //Elimina un item del carrito
  removerItem(id: number){
    var carrito = Object.assign({},this.carrito);
    if(carrito[id].cantidad > 1)
    {
      carrito[id].cantidad -= 1;
    }else{
      delete carrito[id];
      var divItemCarrito = <HTMLDivElement>document.getElementById('cartItem-'+id);
      divItemCarrito.parentNode.removeChild(divItemCarrito);
    }
    this.carrito = carrito;
    this.total();
    this.contarItems();
    this.actualizarPromedioDescuento();
    this.carrito$.next(this.carrito); //Desencadena el evento para que el observable lo detecte
  }

  /* ***************** Geters y Seters ***************** */
  //Configura los gastos de envío
  setGastosEnvio(monto: number){
    this.gastosDeEnvio = monto;
  }

  //Retorna los gastos de envío
  getGastosEnvio(){
    return this.gastosDeEnvio;
  }

  //Configura los descuentos
  setDescuentos(porcentaje: number){
    return this.descuento = porcentaje;
  }

  //Retorna los descuentos
  getDescuento(){
    return this.descuento;
  }

  //Retorna el contenido del carrito con todos sus productos y cantidades
  getCarrito(){
    return this.carrito;
  }


  //Retorna el carrito de compra pero a traves de un observable 
  //(Equivalente a consumir un api a través de httpClient)
  getCarrito$(): Observable<{[id: number]: ItemCarrito}>{
    return this.carrito$.asObservable();
  }
  
  //Retorna el subtotal (no considera gastos de eenvío ni descuentos)
  getSubTotal(){
    return this.totalCarrito;
  }

  //Retorna la cantidad de unidades cargadas en el carrito
  getCantProductos(){
    return this.CantitemsCarrito;
  }

  /* ************ Métdodos privados *************** */
  //Calcula el monto total en productos agregados al carrito sin descuentos ni gastos de envío
  private total(){
    var total: number = 0;
    for(let key in this.carrito){
      total += (this.carrito[key].producto.precio * this.carrito[key].cantidad);
    }

    this.totalCarrito = total;
  }
  

  //Obtiene el total de la cantidad de productos cargados en el carrito sumando las cantidades por producto
  private contarItems(){
    var cantidad: number = 0;
    for(let key in this.carrito){
      cantidad += this.carrito[key].cantidad;
    }
    this.CantitemsCarrito = cantidad;
  }


  //Actualiza el descuento total calculando el promedio del porcentaje aplicado a cada uno de los productos
  private actualizarPromedioDescuento(){
    var sumaDescuento: number = 0;
    var descuento: number = 0;    
    for(let key in this.carrito){
      descuento = this.carrito[key].producto.porcentaje_descuento;
      sumaDescuento += descuento != null ? descuento : 0;
      console.log(this.carrito[key].producto.porcentaje_descuento);
      console.log(descuento);
    }

    this.descuento = (sumaDescuento / this.CantitemsCarrito);
    //console.log(this.descuento);
  }

  /* ************************************************************ */
  //Actualización de los span con los montos y cantidades en el carrito de compra
  /* ************************************************************ */
  //Actualiza los span de subtotal, Gastos de envío, descuentos y total de la compra
  actualizaInfoCarrito(){
    this.actualizaSubTotalCarrito();
    this.actualizaGastosDeEnvio();
    this.actualizaDescuento();
    this.actualizaTotal();
    this.actualizaCantidades();
  }

  //Actualiza el span que muestra el número de prouctos cargados al carrito de compras
  mostrarCantProductos(){    
    var spanCantidad = <HTMLSpanElement>document.getElementById('spnCantidadProd');
    var spanCantidadHeader = <HTMLSpanElement>document.getElementById('spanCantidadProdHeader');
    spanCantidad.innerHTML = this.getCantProductos().toString();
    spanCantidadHeader.innerHTML = spanCantidad.innerHTML;
  }


  

  //Actualiza el span que muestra el subtotal en pesos
  actualizaSubTotalCarrito(){
    var spanSubTotal = <HTMLSpanElement>document.getElementById('carritoSubTotal');
    spanSubTotal.innerHTML = "$ " + this.getSubTotal().toLocaleString('es-ES');
  }

  //Actualiza el span que muestra el valor de gastos de envíos en pesos
  actualizaGastosDeEnvio(){
    var spanGastosEnvio = <HTMLSpanElement>document.getElementById('carritoEnvio');
    spanGastosEnvio.innerHTML = "$ " + this.gastosDeEnvio.toLocaleString('es-ES');
  }

  //Actualiza el span que muestra el porcentaje de descuento
  actualizaDescuento(){
    var spanDescuento = <HTMLSpanElement>document.getElementById('carritoDescuento');
    spanDescuento.innerHTML = Math.round(this.descuento).toLocaleString('es-ES') + " %";
  }

  //Actualiza el span que muestra el total en pesos incluyendo subtotal, gastos de envíos y descuentos.
  actualizaTotal(){
    var spanTotal = <HTMLSpanElement>document.getElementById('carritoTotal');
    var total = this.totalCarrito + this.gastosDeEnvio;
    var descuento = total * (this.descuento / 100);
    spanTotal.innerHTML = "$ " + Math.round((total - descuento)).toLocaleString('es-ES');
  }

  actualizaCantidades(){
    var spanCantidadCarrito = <HTMLSpanElement>document.getElementById('spnCantidadProd');
    var spanCantidadheader = <HTMLSpanElement>document.getElementById('spanCantidadProdHeader');
    spanCantidadCarrito.innerHTML = this.getCantProductos().toString();
    spanCantidadheader.innerHTML = this.getCantProductos().toString();
  }

  
}
