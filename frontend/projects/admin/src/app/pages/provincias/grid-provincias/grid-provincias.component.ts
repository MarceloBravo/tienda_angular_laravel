import { Component, OnInit } from '@angular/core';
import { ProvinciasService } from 'src/app/service/provincias.service';
import { MessagesService } from 'src/app/service/messages.service';
import { Provincia } from 'src/app/class/provincia';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-grid-provincias',
  templateUrl: './grid-provincias.component.html',
  styleUrls: ['./grid-provincias.component.css']
})
export class GridProvinciasComponent implements OnInit {
  public provincias: Provincia[];
  public paginacion: paginacionInterface = {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 1,
    arrPagesNumbers: [],
    filtro: false
  }

  constructor(
    private _provinciasService: ProvinciasService,
    private _mensajeService: MessagesService,
    private _spinnerService: SpinnerService
  ) { 
    this.cargarRegistros();
  }

  ngOnInit() {
  }

  private cargarRegistros(){
    this.paginacion.filtro = false;
    this._spinnerService.show();
    this._provinciasService.get(this.paginacion.pag).subscribe(
      (res: any) =>{
        console.log(res);
        this.actualizarDatos(res);

        this._spinnerService.hide();

      },(error)=>{
        console.log(error);
        var msg = error.error != undefined ? error.error.message : error.message;
        this._mensajeService.mostrarMensaje(msg, 'danger');
        this._spinnerService.hide();

      });
  }


  filtrar(){
    var txtFiltro = <HTMLInputElement>document.getElementById('filtro');

    if(txtFiltro.value !== ""){
      
        this._spinnerService.show();
        if(!this.paginacion.filtro)this.paginacion.pag = 0;
        this.paginacion.filtro = true;

        this._provinciasService.filter(txtFiltro.value, this.paginacion.pag).subscribe(
          (res: any)=>{
            this.actualizarDatos(res);
            this._spinnerService.hide();

          },(error)=>{
            console.log(error);
            var msg = error.error != undefined ? error.error.message : error.message;
            this._mensajeService.mostrarMensaje(msg, 'danger');
            this._spinnerService.hide();

          })
    }else{
      this.cargarRegistros();
    }
  }


  private actualizarDatos(res: any){
    this.provincias = res['data'],
    this.paginacion.filas = res['rows'];
    this.paginacion.pag = res['page'];
    this.paginacion.activePag = this.paginacion.pag + 1;
    this.paginacion.totPag = Math.round(this.paginacion.filas / res['rowsByPage']);
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
    console.log(this.paginacion);
  }


  eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._provinciasService.delete(id).subscribe(
        (res: string[])=>{
          this._mensajeService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);          
          this.cargarRegistros();
          
        },(error)=>{
          console.log(error);
          var msg = error.error != undefined ? error.error.message : error.message;
          this._mensajeService.mostrarMensaje(msg, 'danger');
          this._spinnerService.hide();

        })
    }
  }

  paginaAnterior(){
    if(this.paginacion.pag > 0){
      this.paginacion.pag--;
      this.cargarPagina();
    }
  }

  paginaSiguiente(){
    if(this.paginacion.pag < this.paginacion.totPag){
      this.paginacion.pag++;
      this.cargarPagina();
    }
  }

  paginar(pag: number){
    this.paginacion.pag = pag;
      this.cargarPagina();
  }

  private cargarPagina(){
    if(this.paginacion.filtro){
      this.filtrar();
    }else{
      this.cargarRegistros();
    }
  }
  

  
  
  



}
