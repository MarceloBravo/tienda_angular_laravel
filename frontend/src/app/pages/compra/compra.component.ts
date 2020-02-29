import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { UserLoggedInData } from 'src/app/interfaces/userLogguedInData';
import { Router } from '@angular/router';
import { Pais } from 'src/app/class/pais';
import { Region } from 'src/app/class/region';
import { Comuna } from 'src/app/class/comuna';
import { Provincia } from 'src/app/class/provincia';
import { Ciudad } from 'src/app/class/ciudad';
import { PaisesService } from 'src/app/service/paises.service';
import { RegionesService } from 'src/app/service/regiones.service';
import { ProvinciasService } from 'src/app/service/provincias.service';
import { ComunasService } from 'src/app/service/comunas.service';
import { CiudadesService } from 'src/app/service/ciudades.service';
import { PaisesInterface } from '../../interfaces/PaisesInterface';
import { MessagesService } from 'src/app/service/messages.service';
import { ItemCarrito } from 'src/app/class/item-carrito';
import { CarritoService } from 'src/app/service/carrito.service';
import { PaypalService } from 'src/app/service/paypal.service';
import { DOCUMENT } from '@angular/common';
import { OrdenesService } from 'src/app/service/ordenes.service';
import { PayPalTransactionInterface } from 'src/app/interfaces/PayPalTransactionInterface';
import { WebpayService } from 'src/app/service/webpay.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  public usuario: UserLoggedInData = {
    status: null,
    data: {
        token: null,
        usuario:{
            id: null,
            nombre: null,
            a_paterno: null,
            a_materno: null,
            email: null,
            nickname: null,
            password: null,
            confirm_password: null,
            direccion: null,
            fono: null,
            rol_id: null,
            ciudad_id: null,
            created_at: null,
            updated_at: null,
            deleted_at: null
        },
        rol: null,
        ciudad: null
    }
  };
  private PayPalData: PayPalTransactionInterface = {
    TOKEN: null,
    TIMESTAMP: null,
    CORRELATIONID: null,
    ACK: null, //Resultadio de la petición de transacción (success or error)
    VERSION: null,
    BUILD: null,
    paypal_link: null
  }
  public paises: Pais[];
  public regiones: Region[];
  public provincias: Provincia[];
  public comunas: Comuna[];
  public ciudades: Ciudad[];
  private ciudad: Ciudad = new Ciudad();
  private carrito: ItemCarrito[]; //Array con productos que contendrá el carrito, es utilizado para mostrar los productos en el DOM
  private total: number;
  private tipoPago: number = 1;

  constructor(
    private _loginService: LoginService,
    private _paisesService: PaisesService,
    private _regionesService: RegionesService,
    private _provinciasService: ProvinciasService,
    private _comunasService: ComunasService,
    private _ciudadesService: CiudadesService,
    private _messageService: MessagesService,
    private _carritoService: CarritoService,
    private _paypalService: PaypalService,
    private _WebPayService: WebpayService,
    private _ordenesService: OrdenesService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
    ) { 
      this.cargarDatos();       
    }

  ngOnInit() {
  }


  private async cargarDatos(){
    this.getDatosUsuario();
    this._ordenesService.setDatosCliente(this.usuario); //_ordenesService almacena todos los datos de kla orden (datos del cliente, contenido del carrito, número de orden de pedido, etc.)
    await this.obtenerCiudad(this.usuario.data.usuario.ciudad_id); 
    this.cargarPaises();
    this.cargarRegiones(this.ciudad.pais_id);
    this.cargarProvincias(this.ciudad.region_id);
    this.cargarComunas(this.ciudad.provincia_id);
    this.cargarCiudades(this.ciudad.comuna_id);
    this.cargarCarrito();
    this._ordenesService.setCarrito(this.carrito);  //_ordenesService almacena todos los datos de kla orden (datos del cliente, contenido del carrito, número de orden de pedido, etc.)
  }


  private async obtenerCiudad(id: number){    
    await this._ciudadesService.get(id).toPromise().then((res: Ciudad)=>{
      this.ciudad = res;
    },(error)=>{
      this._messageService.showModalMessage('Error', error);
    })
  }

  private getDatosUsuario(){
    this.usuario = this._loginService.getUser();
    if(this.usuario == null){
      this.router.navigate(["/login"]);
    }
  }


  public cargarPaises(){
    this._paisesService.getAll().subscribe(
      (resp: PaisesInterface[])=>{
        var pais: Pais = new Pais();
        pais.id = null;
        pais.nombre = resp.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        resp.push(pais);
        this.paises = resp.sort((x, y) => x.id - y.id);
    },(error)=>{
      console.log(error);
      this._messageService.mostrarMensaje(error.message, 'danger');
    });
  }

  
  public cargarRegiones(idPais?: number){
    if(idPais == null)
    {
      var pais = <HTMLSelectElement>document.getElementById('pais');    
      idPais = parseInt(pais.value);
    }

    this._regionesService.obtenerPorPais(idPais).subscribe(
      (res: Region[])=>{
        var msg: Region = new Region();        
        msg.id = null;
        msg.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        res.push(msg);

        this.regiones = res.sort((x, y)=> x.id - y.id);        
      },(error)=>{
        this._messageService.showModalMessage('Error', error);
      });
  }


  public cargarProvincias(idRegion?: number){
    if(idRegion == null)
    {
      var regiones = <HTMLSelectElement>document.getElementById('region');
      idRegion =  parseInt(regiones.value);
    }
    
    this._provinciasService.obtenerPorRegion(idRegion).subscribe(
      (res: Provincia[])=>{
        var provincias: Provincia[] = res;
        var msg: Provincia = new Provincia();
        msg.id = null;
        msg.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        provincias.push(msg);
        this.provincias = provincias.sort((x, y) => x.id - y.id);
    });
  }


  public cargarComunas(idProvincia?: number){
    if(idProvincia == null)
    {
      var provincias = <HTMLSelectElement>document.getElementById('provincia');
      idProvincia = parseInt(provincias.value);
    }
    
    this._comunasService.obtenerPorProvincia(idProvincia).subscribe(
      (res: Comuna[])=>{
        var comunas: Comuna[] = res;
        var msg: Comuna = new Comuna();
        msg.id = null;
        msg.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        comunas.push(msg);
        this.comunas = comunas.sort((x, y)=> x.id - y.id);
    });
  }


  public cargarCiudades(idComuna?: number){
    if(idComuna == null)
    {
      var comunas = <HTMLSelectElement>document.getElementById('comuna');
      idComuna = parseInt(comunas.value);
    }
    
    this._ciudadesService.obtenerPorComuna(idComuna).subscribe(
      (res: Ciudad[])=>{
        var ciudades: Ciudad[] = res;
        var msg: Ciudad = new Ciudad();
        msg.id = null;
        msg.nombre = res.length > 0 ? "-- Seleccione --" : "-- No se encontraron registros --";
        ciudades.push(msg);
        this.ciudades = res.sort((x, y)=>x.id - y.id);
    });
  }

  public cargarCarrito(){
    this.carrito = Array();
    this.total = 0;
    var carrito: {[id:number]: ItemCarrito} = this._carritoService.getCarrito();
    for(var item in carrito){
      this.carrito.push(carrito[item]);
      this.total += carrito[item].producto.precio * carrito[item].cantidad;
    }    
  }

  public setTipoPago(tipo: number){
    this.tipoPago = tipo;
  }

  private efectuarPago(){
    switch(this.tipoPago){
      case 1:
        this.pagoWebPay();
        break;
      case 2:
        this.pagoPaypal();
        break;
      default:
        break;
    }
  }

  //https://www.itsolutionstuff.com/post/paypal-integration-in-laravel-6-exampleexample.html Implementar PayPal
  private pagoPaypal(){
    if(confirm("¿Desea concretar el pago con PayPal?")){ 
      this._ordenesService.setTipoDocumento("F"); //"F" => La aplicación momentaneamente  sólo emite Facturas 
      var codOrden = Math.floor(Math.random() * 100000) + 1000; //Genera un nùmero aleatorio entre 1000 y 100000 el cual es utilizasdo còmo còdigo de orden de compra.
      this._ordenesService.setCodigoOrden(codOrden.toString()); //Adjunta el código de Orden provisorio a los datos de la venta

      this._paypalService.paymentPaypal(this._ordenesService.getDatosVenta()).subscribe(
        (res: string[])=>{
          console.log(res);

          //Recuperamos la respuesta de solicitud de transacción de devuelta por PayPal
          this.PayPalData.TOKEN = res['RESPONSE']['TOKEN'];
          this.PayPalData.ACK = res['RESPONSE']['ACK'];
          this.PayPalData.BUILD = res['RESPONSE']['BUILD'];
          this.PayPalData.CORRELATIONID = res['RESPONSE']['CORRELATIONID'];
          this.PayPalData.TIMESTAMP = res['RESPONSE']['TIMESTAMP'];
          this.PayPalData.VERSION = res['RESPONSE']['VERSION'];
          this.PayPalData.paypal_link = res['RESPONSE']['paypal_link'];

          this._ordenesService.setPayPalData(this.PayPalData);  //Adjunta los datos devueltos por PayPal a los datos de la venta

          localStorage.setItem('datosVenta', JSON.stringify(this._ordenesService.getDatosVenta()));
          this.document.location.href = res['RESPONSE']['paypal_link']; //Redirecciona a la página de PayPal para concretar la venta
        },(error)=>{
          console.log(error);
          this._messageService.showModalMessage("Error",error.error.message);
        })
    }
  }


  //https://packagist.org/packages/freshwork/transbank    Implementar WebPay
  //https://www.transbankdevelopers.cl/documentacion/como_empezar#ambiente-de-integracion Datos de prueba WebPay
  private pagoWebPay(){
    if(confirm("¿Desea concretar el pago con WebPay?")){ 
      var carrito: {[id: number]: ItemCarrito} = this._ordenesService.getCarrito();
      var total: number = 0;
      for(let item in carrito){
        total += carrito[item].producto.precio * carrito[item].cantidad;
      }
      this._WebPayService.paymentWebPay(total).subscribe(
        (res)=>{
          localStorage.setItem('datosVenta', JSON.stringify(this._ordenesService.getDatosVenta()));
          //console.log(res);

          var form = document.createElement('form');
          document.body.appendChild(form);
          form.method = 'post';
          form.action = res['url'];
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'TBK_TOKEN';
          input.value = res['token'];
          form.appendChild(input);
          form.submit();
      },(error)=>{
        console.log(error);
        this._messageService.showModalMessage("Error",error.error.message);
      });
   } 
  }
}
