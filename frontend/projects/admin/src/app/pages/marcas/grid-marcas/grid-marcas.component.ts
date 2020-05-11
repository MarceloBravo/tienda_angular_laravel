import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/service/marcas.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { MessagesService } from 'src/app/service/messages.service';
import { Marca } from '../../../../../../../src/app/class/marca';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { error } from 'protractor';

@Component({
  selector: 'app-grid-marcas',
  templateUrl: './grid-marcas.component.html',
  styleUrls: ['./grid-marcas.component.css']
})
export class GridMarcasComponent implements OnInit {
  public marcas: Marca[];
  public paginacion: paginacionInterface= {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 1,
    arrPagesNumbers: [],
    filtro: ''

  }

  constructor(
    private _marcasService: MarcasService,
    private _spinnerService: SpinnerService,
    private _mensajeService: MessagesService
  ) { 
    this.cargarRegistros();
  }

  ngOnInit() {
  }

  private cargarRegistros(){
    this._spinnerService.show();
    this._marcasService.get(this.paginacion.pag).subscribe(
      (res: any[])=>{        
        this.paginacion.filtro= '';
        this.handlerSuccess(res);        

      },(error) =>{
        this.handlerError(error);
      }
    )
  }

  filtrar(){
    this._mensajeService.ocultarMensaje();
    let filtro = <HTMLInputElement>document.getElementById('filtro');    
    if(filtro.value !== ''){

      this._spinnerService.show();
      if(this.paginacion.filtro === filtro.value)this.paginacion.filtro = filtro.value;

      this._marcasService.filter(filtro.value, this.paginacion.pag).subscribe(
        (res: any[])=>{
          this.handlerSuccess(res);          

        },(error) => {
          this.handlerError(error);
        }
      )
    }else{
      this.paginacion.pag = 0;
      this.cargarRegistros();
    }
  }

  eliminar(id: number){
    if(window.confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._marcasService.delete(id).subscribe(
        (res: string[])=>{
          this._mensajeService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
          this.cargarRegistros();
          this._spinnerService.hide();

        },(error) =>{
          this.handlerError(error);
        }
      )
    }
  }

  paginarSiguiente(){
    if(this.paginacion.pag < this.paginacion.totPag){
      this.paginacion.pag++;
      this.actualizarGrilla();
    }
  }

  paginarAnterior(){
    if(this.paginacion.pag > 0){
      this.paginacion.pag--;
      this.actualizarGrilla();
    }
  }

  paginar(pagina: number){
    this.paginacion.pag = pagina;
    this.actualizarGrilla();
  }

  private actualizarGrilla(){
    if(this.paginacion.filtro === ''){
      this.cargarRegistros();
    }else{
      this.filtrar();
    }
  }

  private handlerSuccess(res: any[]){
    this.marcas = res['data'];
    this.paginacion.filas = res['rows'];
    this.paginacion.totPag = Math.ceil(res['rows'] / res['rowsByPag']);
    this.paginacion.activePag = res['pag'] + 1;
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
    this._spinnerService.hide();
  }


  private handlerError(error){
    console.log(error);
    this._mensajeService.mostrarMensaje(error.message, 'danger');
    this._spinnerService.hide();
  }
}