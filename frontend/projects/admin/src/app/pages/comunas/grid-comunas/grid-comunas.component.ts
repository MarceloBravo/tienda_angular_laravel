import { Component, OnInit } from '@angular/core';
import { ComunasService } from 'src/app/service/comunas.service';
import { Comuna } from 'src/app/class/comuna';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from '../../../../../../../src/app/service/spinner.service';


@Component({
  selector: 'app-grid-comunas',
  templateUrl: './grid-comunas.component.html',
  styleUrls: ['./grid-comunas.component.css']
})
export class GridComunasComponent implements OnInit {
  public comunas: Comuna[];
  public paginacion: paginacionInterface = {
    pag: 0, //Número de página real inicia desde 0
    filas: 0,
    totPag: 0,
    activePag: 1, //Número de ágina a mostrar en el html, inicia desde 1
    arrPagesNumbers: [],
    filtro: ''
  };


  constructor(
    private _comunasService: ComunasService,
    private _mensajesService: MessagesService,
    private _spinnerService: SpinnerService
    ) {
      this.obtenerComunas();
    }

  ngOnInit() {
  }

  private obtenerComunas(){
    this._spinnerService.show();
    this._comunasService.get(this.paginacion.pag).subscribe(
      (res: any[])=>{
      this.cargarDatos(res);    
      this._spinnerService.hide();

    },(error)=>{
      console.log(error);
      this._mensajesService.mostrarMensaje(error.message,'danger');
      this._spinnerService.hide();
    });
  }

  filtrar(){
    var texto = <HTMLInputElement>document.getElementById('filtro');
    if(texto.value !== ""){
      if(texto.value != this.paginacion.filtro)this.paginacion.pag = 0
      this.paginacion.filtro = texto.value;

      this._spinnerService.show();
      this._comunasService.filter(texto.value, this.paginacion.pag).subscribe(
        (res: any[])=>{
          this.cargarDatos(res);
          this._spinnerService.hide();

        },(error)=>{
          console.log(error);
          this._mensajesService.mostrarMensaje(error.message,'danger');
          this._spinnerService.hide();
        });

    }else{
      this.paginacion.filtro = '';
      this.obtenerComunas();
    }
  }


  private cargarDatos(res: any[]){
    this.comunas = res['data'];
    this.paginacion.pag = res['page'];
    this.paginacion.activePag = this.paginacion.pag + 1; //Número de página a mostrar en el html
    this.paginacion.filas = res['rows'];
    this.paginacion.totPag = Math.ceil(this.paginacion.filas / res['rowsByPage']);
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
  }

  eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._comunasService.delete(id).subscribe(
        (res: string[])=>{
          this._mensajesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
          this.paginacion.filtro = '';
          this.obtenerComunas();  //Buelve a consultar los datos desde la base de datos para refrescar la grilla
          this._spinnerService.hide();

        },(error)=>{
          console.log(error);
          this._mensajesService.mostrarMensaje(error.message, 'danger');
          this._spinnerService.hide();
        });
    }
  }

  paginarAnterior(){
    if(this.paginacion.pag > 0){
      this.paginacion.pag--;  
      if(this.paginacion.filtro != ''){
        this.filtrar();
      }else{
        this.obtenerComunas();
      }    
    }
  }

  paginarSiguiente(){
    if(this.paginacion.pag < this.paginacion.totPag){
      this.paginacion.pag++;  
      if(this.paginacion.filtro != ''){
        this.filtrar();
      }else{
        this.obtenerComunas();
      }    
    }
  }

  paginar(pag: number){
    this.paginacion.pag = pag;  
    if(this.paginacion.filtro != ''){
      this.filtrar();
    }else{
      this.obtenerComunas();
    }
  }
}
