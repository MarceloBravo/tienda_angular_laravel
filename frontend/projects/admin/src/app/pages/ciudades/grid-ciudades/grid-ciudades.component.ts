import { Component, OnInit } from '@angular/core';
import { CiudadesService } from 'src/app/service/ciudades.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { MessagesService } from 'src/app/service/messages.service';
import { Ciudad } from 'src/app/class/ciudad';
import { paginacionInterface } from '../../../interfaces/paginacion';

@Component({
  selector: 'app-grid-ciudades',
  templateUrl: './grid-ciudades.component.html',
  styleUrls: ['./grid-ciudades.component.css']
})
export class GridCiudadesComponent implements OnInit {
  public ciudades: Ciudad[];
  public paginacion: paginacionInterface = {
    pag: 0, //Número de pagina de datos a solicitar (inicia desde 0)
    filas: 0, //Total  de filas retornadas sin páginar
    totPag: 0,  //Cantidad de páginas calculadas
    activePag: 1, //Número de página a mostrar en el html
    arrPagesNumbers: [],  //Array con el número de las páginas 
    filtro: ''
  };  
  
  constructor(
    private _ciudadesService: CiudadesService,
    private _spinnerService: SpinnerService,
    private _mensajesService: MessagesService
  ) { 
    this.obtenerCiudades();
  }

  ngOnInit() {
  }

  private obtenerCiudades(){    
    this._spinnerService.show();
    
    this._ciudadesService.get(this.paginacion.pag).subscribe(
      (res: any[])=>{        
        this.cargarDatos(res);

        this._spinnerService.hide();

      },(error)=>{
        console.log(error);
        this._mensajesService.mostrarMensaje(error.message, 'danger');
        this._spinnerService.hide();
      }
    )
  }

  eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._ciudadesService.delete(id).subscribe(
        (res: string[])=>{
          this._mensajesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
          this.obtenerCiudades();

        },(error)=>{
          this.handlerError(error);
        }
      )
    }
  }

  filtrar(){
    var inputFiltro = <HTMLInputElement>document.getElementById('filtro');

    if(inputFiltro.value !== ""){
      if(this.paginacion.filtro !== inputFiltro.value)this.paginacion.pag = 0;
      this.paginacion.filtro = inputFiltro.value;

      this._ciudadesService.filter(inputFiltro.value, this.paginacion.pag).subscribe(
        (res :any[])=>{
          this.cargarDatos(res);

        },(error)=>{
          this.handlerError(error);
        }
      )
    }else{
      this.paginacion.filtro = '';
      this.obtenerCiudades();
    }
  }


  private cargarDatos(res: any[]){
    console.log(res);
    this.ciudades = res['data'];
    this.paginacion.pag = res['page'];
    this.paginacion.activePag = this.paginacion.pag + 1;
    this.paginacion.filas = res['rows'];
    this.paginacion.totPag = Math.round(this.paginacion.filas / res['rowsByPage']) + 1;
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
    console.log(this.paginacion.filas,  res);
  }


  private handlerError(error){
    console.log(error);
    this._mensajesService.mostrarMensaje(error.message, 'danger');
    this._spinnerService.hide();          
  }


  paginarAnterior(){
    if(this.paginacion.pag > 0){      
      this.paginacion.pag--;
      if(this.paginacion.filtro !== ''){        
        this.filtrar();
      }else{
        this.obtenerCiudades();
      }
    }
  }

  paginarSiguiente(){
    if(this.paginacion.pag < this.paginacion.totPag){
      this.paginacion.pag++;
      if(this.paginacion.filtro !== ''){        
        this.filtrar();
      }else{
        this.obtenerCiudades();
      }
    }
  }

  paginar(pag: number){
    this.paginacion.pag = pag;
    if(this.paginacion.filtro !== ''){      
      this.filtrar();
    }else{
      this.obtenerCiudades();
    }
  }
}
