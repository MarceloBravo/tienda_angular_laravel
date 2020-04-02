import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/service/empresa.service';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { Empresa } from 'src/app/class/empresa';

@Component({
  selector: 'app-grid-empresas',
  templateUrl: './grid-empresas.component.html',
  styleUrls: ['./grid-empresas.component.css']
})
export class GridEmpresasComponent implements OnInit {
  public empresas: Empresa[];
  public paginacion: paginacionInterface = {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 1,
    arrPagesNumbers: [],
    filtro: ''
  }

  constructor(
    private _empresasService: EmpresaService,
    private _mensajesService: MessagesService,
    private _spinnerService: SpinnerService
  ) { 
    this.obtnerEmpresas();
  }

  ngOnInit() {
  }

  private obtnerEmpresas(){
    this._spinnerService.show();
    this._empresasService.get(this.paginacion.pag).subscribe(
      (res: any[])=>{
        this.handlerSuccess(res);

        this._spinnerService.hide();
      },(error)=>{
        this.handlerError(error);
      }
    )
  }

  filtrar(){
    var inputFiltro = <HTMLInputElement>document.getElementById('filtro');

    if(inputFiltro.value !== ''){
      if(this.paginacion.filtro !== inputFiltro.value)this.paginacion.pag = 0;
      this.paginacion.filtro = inputFiltro.value;

      this._spinnerService.show();
      this._empresasService.filter(inputFiltro.value, this.paginacion.pag).subscribe(
        (res: any[])=>{
          this.handlerSuccess(res);

        },(error)=>{
          this.handlerError(error);
        }
      )

    }else{
      this.paginacion.filtro = '';
      this.obtnerEmpresas();
    }
  }

  eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._empresasService.delete(id).subscribe(
        (res: string)=>{
          this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
          this._spinnerService.hide();
          this.obtnerEmpresas();          
          
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
      this.obtnerEmpresas();
    }
  }

  private handlerError(error){
    console.log(error);
    this._mensajesService.mostrarMensaje(error.message, 'danger');
    this._spinnerService.hide();
  }

  private handlerSuccess(res: any[]){
    this.empresas = res['data'];
    this.paginacion.pag = res['page'];
    this.paginacion.filas = res['rows'];
    this.paginacion.totPag = Math.ceil(this.paginacion.filas / res['rowsByPage']);
    this.paginacion.activePag = this.paginacion.pag + 1;
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
    this._spinnerService.hide();
  }
}
