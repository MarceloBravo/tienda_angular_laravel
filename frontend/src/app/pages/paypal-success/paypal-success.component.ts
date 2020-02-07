import { Component, OnInit } from '@angular/core';
import { ItemCarrito } from 'src/app/class/item-carrito';
import { LoginService } from 'src/app/service/login.service';
import { UserLoggedInData } from 'src/app/interfaces/userLogguedInData';
import { datosVenta } from '../../interfaces/datosVenta';
import { OrdenesService } from 'src/app/service/ordenes.service';
import { MessagesService } from 'src/app/service/messages.service';
import { EstadosService } from 'src/app/service/estados.service';
import { estadosInterface } from '../../interfaces/estadosInterface';
import { ordenesInterface } from 'src/app/interfaces/ordenInterface';
import { empresaInterface } from 'src/app/interfaces/empresaInterface';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Router } from '@angular/router';
//https://blog.nubecolectiva.com/generar-pdf-con-angular-js-5/  //Generar pedf 
import * as jsPDF from 'jspdf';
import htmlToImage from 'html-to-image';

//declare var jsPDF: any;
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-paypal-success',
  templateUrl: './paypal-success.component.html',
  styleUrls: ['./paypal-success.component.css']
})
export class PaypalSuccessComponent implements OnInit {
  public carritoArray: ItemCarrito[] = new Array();
  public subTotal: number = 0;
  //public shipping: number = 0;
  //public descuento: number = 0;
  //public total: number = 0;
  public fecha: string;
  public usuario: UserLoggedInData;
  public datosVenta: datosVenta;
  public ciudad: string;
  private estado: estadosInterface = {
    id: null,
    nombre: null,
    estado_inicial: null,
    created_at: null,
    updated_at: null,
    deleted_at: null
  }
  private empresa: empresaInterface = {  
    id: null,
    nombre: null,
    direccion: null,
    ciudad_id: null,
    fono: null,
    email: null,
    giro: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    ciudad: null
  }
  
  constructor(
    private _loginService: LoginService,
    private _ordenesService: OrdenesService,
    private _messagesService: MessagesService,
    private _estadosService: EstadosService,
    private _empresaService: EmpresaService,
    private router: Router
  ) {
    //Generando la fecha
    var fecha = new Date();
    this.fecha = (fecha.getDate() < 10 ? '0' : '') + fecha.getDate() + '/' + ((fecha.getMonth()+1) < 10 ? '0' : '') + (fecha.getMonth()+1) + '/' + fecha.getFullYear();

    this.datosVenta = JSON.parse(localStorage.getItem('datosVenta')); //Rescata los datos desde el almacenamiento local luego de regresar desde Paypal
    this.actualizarCarritoTotalDescuentoSubtotal();  //Calculando el total de la venta
    //Preparando datos a mostrar en la factura
    this.prepararDatosAGrabar();  
  }

  ngOnInit() {
  }
  
  private async prepararDatosAGrabar(){

    

    //Obteniendo los datos del cliente
    this._loginService.setUser(this.datosVenta.datosCliente);
    this._loginService.showUserInfo();
    this.usuario = this._loginService.getUser();

    //Completando los otros datos necesarios para registrar la venta    
    this.datosEmpresa(); 
    this.estado = await this.obtenerPrimerEstadoPedido(); //Los estados pueden ser Pendiente, En Preparación, Enviado, Finalizada, etc.
    this.datosVenta.estado_id = this.estado.id;
    this.datosVenta.shipping = 0; //Costo de envío
    this.datosVenta.user_id = this.datosVenta.datosCliente.data.usuario.id; //Id del usuario (Cliente)    
    this.datosVenta.tipo_documento = "F";  //Momentaneamente la aplicación sólo emitirá Facturas
    console.log(this.datosVenta);
    this.grabarVenta(); //Registrando la venta en la base de datos
  }


  private actualizarCarritoTotalDescuentoSubtotal(){
    var carrito: {[id: number]: ItemCarrito} = this.datosVenta.carrito;
    var items: number = 0;
    var descuento: number = 0;
    this.datosVenta.total = 0;
    for(let item in carrito){      
      this.carritoArray.push(carrito[item]);
      this.datosVenta.subtotal += carrito[item].producto.precio_anterior * carrito[item].cantidad;      
      this.datosVenta.total += carrito[item].producto.precio * carrito[item].cantidad;      
      descuento += carrito[item].producto.porcentaje_descuento;
      items++;
    }
    this.datosVenta.descuento = Math.round(descuento/items);
  }

  private grabarVenta(){
    this._ordenesService.save(this.datosVenta).subscribe(
      (res: any) =>{
      console.log(res);      
      this._messagesService.mostrarMensaje(res.message, "success");
      this.actualizarNumeroDocumento(res.id);
    },(error)=>{
      //console.log(error);
      this._messagesService.mostrarMensaje(error.error.message, "success");
    });
  }


  private async obtenerPrimerEstadoPedido(): Promise<estadosInterface>{
    var res: estadosInterface = await this._estadosService.getFirstState().toPromise().then(
      (res: estadosInterface) => {
        return res;
    });
    return res;
  }

  private actualizarNumeroDocumento(id: number){
    this._ordenesService.get(id).subscribe(
      (res: ordenesInterface)=>{
        var numFactura = <HTMLSpanElement>document.getElementById('num-documento');
        var numOrden = <HTMLSpanElement>document.getElementById('num-orden');
        numFactura.innerHTML = (res.tipo_documento == 'F' ? res.num_factura : res.num_boleta).toString().padStart(10, "0") ;
        numOrden.innerHTML = res.id.toString().padStart(10,"0") ;
    }, (error)=>{
      //console.log(error);
      this._messagesService.mostrarMensaje(error.error.message, 'success');
    });
  }

  private datosEmpresa(){
    this._empresaService.getDefault().subscribe(
      (res: empresaInterface) => {        
        this.empresa = res;
        this.ciudad = res.ciudad[0].nombre;
    },(error)=>{
      console.log(error);
      this._messagesService.mostrarMensaje(error.error.message, "success");
    })
  }

  public generarPdf(){
    const filename = 'rtgs-form.pdf';
    const node = document.getElementById('invoice');
    htmlToImage.toPng(node)
    .then( (dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      //const pdf = new jsPDF('p', 'mm', 'a4');
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.setLineWidth(1);      
      pdf.addImage(img, 'PNG', 10, 10, 270, 190);
      pdf.save(filename);
    })
    .catch((error) => {
      console.error('oops, Algo salio mal!', error);
    });
    //var elem: HTMLDivElement = <HTMLDivElement>document.getElementById("invoice"); 
    //const documentDefinition = { content: elem.innerHTML };
    //pdfMake.createPdf(documentDefinition).open();
/*
      var doc = new jsPDF ('letter');
      var elem = <HTMLDivElement>document.getElementById("invoice"); 
      console.log(elem.innerHTML);     
      doc.fromHTML(elem.innerHTML, 0, 0);
      var fecha = new Date();
      var strFecha = (fecha.getDate() < 10 ? '0' : '') + fecha.getDate() + '/' + (fecha.getMonth() < 9 ?  '0' : '') + (fecha.getMonth()+ 1)  + '/' + fecha.getFullYear();
      doc.save('comprobante' + strFecha + '.pdf');
  */    
  }

  public imprimirDocumento(){
    var divFactura = <HTMLDivElement>document.getElementById('invoice');
    var body = <HTMLBodyElement>document.body;
    var originalBodyContent = body.innerHTML;
    
    body.innerHTML = divFactura.innerHTML;    
    window.focus();
    window.print();
    body.innerHTML = originalBodyContent;
    alert("Redireccionando");
    this.router.navigate(["/home"]);
    /*
    //Código para imprimir en una nueva ventana
    //var winPrint = window.open('','PRINT','height=400,width=600');
    var winPrint = window.open('','PRINT');
    winPrint.document.write('<html><head><title>Factura</title>');
    winPrint.document.write('<link rel=\'stylesheet\' href=\'./paypal-success.component.css\' />');
    winPrint.document.write('</head>');
    winPrint.document.write('<body>');
    winPrint.document.write('<h1>Factura</h1>');
    winPrint.document.write(divFactura.innerHTML);
    winPrint.document.write('</body></html>');

    winPrint.document.close(); //Necesario para IE
    winPrint.focus(); //Necesario para IE
    winPrint.print();
    winPrint.close();
    */
  }
}
