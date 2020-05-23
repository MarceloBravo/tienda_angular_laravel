import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from '../../../../../../../src/app/service/spinner.service';
import { Producto } from '../../../../../../../src/app/class/producto';
import { paginacionInterface } from '../../../interfaces/paginacion';

@Component({
  selector: 'app-grid-productos',
  templateUrl: './grid-productos.component.html',
  styleUrls: ['./grid-productos.component.css']
})
export class GridProductosComponent implements OnInit {
  public productos: Producto[];
  public paginacion: paginacionInterface = {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 1,
    arrPagesNumbers: [],
    filtro: ''
  }
  

  constructor(
    private _productoService: ProductoService,
    private _mensajeService: MessagesService,
    private _spinnerService: SpinnerService
  ) { 
    this.cargarRegistros();
  }

  ngOnInit() {
  }

  private cargarRegistros(){
    this._spinnerService.show();
    this._productoService.get(this.paginacion.pag).subscribe(
      (res: any[])=>{
        this.handlerSuccess(res);
        
      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  filtrar(){
    this._mensajeService.ocultarMensaje();
    let filtro = <HTMLInputElement>document.getElementById('filtro');
    if(filtro.value !== ''){
      this._spinnerService.show();
      if(this.paginacion.filtro !== filtro.value)this.paginacion.pag = 0
      this.paginacion.filtro =filtro.value;

      this._productoService.filter(filtro.value, this.paginacion.pag).subscribe(
        (res: any[])=>{
          this.handlerSuccess(res);
        },(error)=>{
          this.handlerError(error);
        }
      );
    }else{
      this.paginacion.pag = 0;
      this.cargarRegistros();
    }
  }

  eliminar(id: number){
    if(window.confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._productoService.delete(id).subscribe(
        (res: string[])=>{
          this._mensajeService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
          this._spinnerService.hide();

        },(error)=>{
          this.handlerError(error);
        }
      )
    }
  }

  paginarSiguiente(){
    if(this.paginacion.pag < this.paginacion.totPag){
      this.paginacion.pag++;
      this.cargarDatosPagina();
    }
  }

  paginarAnterior(){
    if(this.paginacion.pag > 0){
      this.paginacion.pag--;      
      this.cargarDatosPagina();
    }
  }

  paginar(pag: number){
    this.paginacion.pag = pag;
    this.cargarDatosPagina();
  }

  private cargarDatosPagina(){
    if(this.paginacion.filtro !== ''){
      this.filtrar();
    }else{
      this.cargarRegistros();
    }
  }

  private handlerSuccess(res: any[]){
    this.productos = res['data'];
    this.paginacion.pag = res['page'];
    this.paginacion.activePag = res['page'] + 1;
    this.paginacion.filas = res['rows'];
    this.paginacion.totPag = Math.ceil(res['rows'] / res['rowsByPage']);
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections 
    this._spinnerService.hide();
  }

  private handlerError(error: any){
    console.log(error);
    this._mensajeService.mostrarMensaje(error.message(), 'danger');
    this._spinnerService.hide();
  }

  public rutaImagen(item)
  {
    if(item.imagenes.length == 0)return '';
    let img = item.imagenes.filter( i => i.default);
    return (img[0] !== undefined ? item.ruta_imagen + '/' + img[0].url : '' );
  }

}
