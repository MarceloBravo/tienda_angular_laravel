import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/service/paises.service';
import { Pais } from 'src/app/class/pais';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-grid-paises',
  templateUrl: './grid-paises.component.html',
  styleUrls: ['./grid-paises.component.css']
})
export class GridPaisesComponent implements OnInit {
  public paises: Pais[];
  public paginacion: paginacionInterface = {
    totPag: 0,
    activePag: 1,
    filas: 0,
    pag: 0,
    arrPagesNumbers: [],
    filtro: false
  };

  constructor(
    private _paisesServices: PaisesService,
    private _messagesServices: MessagesService,
    private _spinnerService: SpinnerService,
  ) { 
    this.cargarRegistros();
  }

  ngOnInit() {
  }


  private cargarRegistros(){
    this.paginacion.filtro = false;
    this._spinnerService.show();
    this._paisesServices.get(this.paginacion.pag).subscribe(
      (res: any[])=>{
        this.actualizaResult(res);
        this._spinnerService.hide();

      },(error)=>{
        console.log(error);
        this._messagesServices.mostrarMensaje(error.message, 'danger');
        this._spinnerService.hide();
      });
  }


  filtrar(){
    this._spinnerService.show();
    var txtFiltro = <HTMLInputElement>document.getElementById('filtro');
    if(txtFiltro.value != ""){
      
      if(!this.paginacion.filtro)this.paginacion.pag = 0;

      this.paginacion.filtro = true;
      this._paisesServices.filter(txtFiltro.value, this.paginacion.pag).subscribe(
        (res: any[])=>{
          this.actualizaResult(res);
          this._spinnerService.hide();

        },(error)=>{
          console.log(error);
          this._messagesServices.mostrarMensaje(error.message, 'danger');
          this._spinnerService.hide();
        });
    }else{
      this.paginacion.pag = 0;
      this.cargarRegistros();
    }

  }

  private actualizaResult(res: any[]){
    this.paises = res['data'];
    this.paginacion.pag = res['page'];
    this.paginacion.activePag = this.paginacion.pag + 1;
    this.paginacion.filas = res['rows'];
    this.paginacion.totPag = Math.round(this.paginacion.filas / res['rowsByPag']);
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
  }


  eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._paisesServices.delete(id).subscribe(
        (res:string[])=>{
          this._messagesServices.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
          this.cargarRegistros();
          this._spinnerService.hide();

        },(error)=>{
          console.log(error);
          this._messagesServices.mostrarMensaje(error.message, 'danger');
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
    if(this.paginacion.filtro){
      this.filtrar();
    }else{
      this.cargarRegistros();
    }
  }
}
