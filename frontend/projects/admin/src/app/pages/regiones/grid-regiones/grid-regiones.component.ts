import { Component, OnInit } from '@angular/core';
import { RegionesService } from 'src/app/service/regiones.service';
import { Region } from 'src/app/class/region';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-grid-regiones',
  templateUrl: './grid-regiones.component.html',
  styleUrls: ['./grid-regiones.component.css']
})
export class GridRegionesComponent implements OnInit {
  public regiones: Region[];
  public paginacion: paginacionInterface = {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 1,
    arrPagesNumbers: Array(),
    filtro: ''
  }

  constructor(
    private _regionesService: RegionesService,
    private _mensajesService: MessagesService,
    private _spinnerService: SpinnerService
  ) {
    this.obtenerRegistros();
   }

  ngOnInit() {
  }

  private obtenerRegistros(){
    this.paginacion.filtro = '';
    this._spinnerService.show();
    this._regionesService.get(this.paginacion.pag).subscribe(
      (res: any[])=>{
        this.cargarResultados(res);
        this._spinnerService.hide();

      },(error)=>{
        var msg = error.error != undefined ? error.error.message : error.message;
          this._mensajesService.mostrarMensaje(msg, 'danger');
          this._spinnerService.hide();

      });
  }

  filtrar(){
    var txtFiltro = <HTMLInputElement>document.getElementById('filtro');

    if(txtFiltro.value == ""){
      this.paginacion.pag = 0;
      this.obtenerRegistros();
    }else{

      if(this.paginacion.filtro != txtFiltro.value)this.paginacion.pag = 0;
      this.paginacion.filtro = txtFiltro.value;

      this._spinnerService.show();
      this._regionesService.filter(txtFiltro.value, this.paginacion.pag).subscribe(
        (res: any[])=>{
          this.cargarResultados(res);
          this._spinnerService.hide();

        },(error)=>{
          console.log(error);
          var msg = error.error != undefined ? error.error.message : error.message;
          this._mensajesService.mostrarMensaje(msg, 'danger');
          this._spinnerService.hide();
          
        });
      }

  }

  private cargarResultados(res: any[]){
    this.regiones = res['data'];
    this.paginacion.pag = res['page'];
    this.paginacion.activePag = this.paginacion.pag + 1;
    this.paginacion.filas = res['rows'];        
    this.paginacion.totPag = Math.round(this.paginacion.filas / res['rowsByPage'])+ 1;
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
    console.log(this.paginacion);
  }

  eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._regionesService.delete(id).subscribe(
        (res: string[])=>{
          this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);          
          this._spinnerService.hide();
          this.obtenerRegistros();

        },(error)=>{
          console.log(error);
          var msg = (error.error != undefined ? error.error.message : error.message);
          this._mensajesService.mostrarMensaje(msg,'danger');
          this._spinnerService.hide();
          
        });

    }
  }

  paginaAnterior(){
    if(this.paginacion.pag > 0){
      this.paginacion.pag--;
      this.cambiarPagina();
    }
  }

  paginar(pag: number){
    this.paginacion.pag = pag;
    this.cambiarPagina();
  }

  paginaSiguiente(){
    if(this.paginacion.pag < this.paginacion.totPag){
      this.paginacion.pag++;
      this.cambiarPagina();
    }
  }

  private cambiarPagina(){
    if(this.paginacion.filtro != ''){
      this.filtrar()
    }else{
      this.obtenerRegistros();
    }
  }

}
