import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/service/categorias.service';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { Categoria } from 'src/app/class/categoria';
import { paginacionInterface } from '../../../interfaces/paginacion';

@Component({
  selector: 'app-grid-categorias',
  templateUrl: './grid-categorias.component.html',
  styleUrls: ['./grid-categorias.component.css']
})
export class GridCategoriasComponent implements OnInit {
  public categorias: Categoria[];
  public paginacion: paginacionInterface = {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 1,
    arrPagesNumbers: [],
    filtro: ''
  };

  constructor(
    private _categoriasService: CategoriasService,
    private _mensajesService: MessagesService,
    private _spinnerService: SpinnerService
  ) { 
    this.obtenerCategorias();
  }

  ngOnInit() {
  }

  private obtenerCategorias(){
    this._spinnerService.show();
    this._categoriasService.get(this.paginacion.pag).subscribe(
      (res: any[])=>{
        this.handlerSuccess(res);
        this._spinnerService.hide();

      },(error)=>{
        this.handlerError(error);
        this._spinnerService.hide();
      });
  }

  filtrar(){
    var txtFiltro = <HTMLInputElement>document.getElementById('filtro');
    if(txtFiltro.value !== ''){

      if(txtFiltro.value !== this.paginacion.filtro)this.paginacion.pag = 0;
      this.paginacion.filtro = txtFiltro.value;

      this._spinnerService.show();
      this._categoriasService.filter(txtFiltro.value, this.paginacion.pag).subscribe(
        (res: any[])=>{
          this.handlerSuccess(res);
          this._spinnerService.hide();
          
        },(error)=>{
          this.handlerError(error);
          this._spinnerService.hide();
        })
    }else{
      this.paginacion.filtro = '';
      this.paginacion.pag = 0;
      this.obtenerCategorias();
    }
  }

  eliminar(id: number){
    if(window.confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();     
      this._categoriasService.delete(id).subscribe(
        (res: string[])=>{
          this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
          this._spinnerService.hide();
          this.obtenerCategorias();

        },(error)=>{
          this.handlerError(error);
          this._spinnerService.hide();
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
      this.obtenerCategorias();
    }
  }

  private handlerSuccess(res: any[]){
    this.categorias = res['data'];
    this.paginacion.pag = res['page'];
    this.paginacion.filas = res['rows'];
    this.paginacion.activePag = this.paginacion.pag + 1;
    this.paginacion.totPag = Math.ceil(this.paginacion.filas / res['rowsByPage']);
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
  }

  private handlerError(error){
    console.log(error);
    this._mensajesService.mostrarMensaje(error.message, 'danger');
  }
}
