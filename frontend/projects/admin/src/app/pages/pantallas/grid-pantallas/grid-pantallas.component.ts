import { Component, OnInit } from '@angular/core';
import { PantallasService } from '../../../services/pantallas.service';
import { Pantalla } from '../../../clases/pantalla';
import { MessagesService } from 'src/app/service/messages.service';
import { ScriptsService } from '../../../services/scripts.service';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-grid-pantallas',
  templateUrl: './grid-pantallas.component.html',
  styleUrls: ['./grid-pantallas.component.css',
              '../../../../assets/vendor/fontawesome-free/css/all.min.css', //Ruta relativa a éste proyecto
              '../../../../assets/vendor/bootstrap/css/bootstrap.min.css',  //Ruta relativa a éste proyecto
              '../../../../assets/css/ruang-admin.min.css', //Ruta relativa a éste proyecto
              '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css']//Ruta relativa a éste proyecto
})

export class GridPantallasComponent implements OnInit {
  public pantallas: Pantalla[];
  public paginacion: paginacionInterface = {
    arrPagesNumbers: Array(),
    activePag: 1,
    totPag: 0,
    pag: 0,
    filas: 0
  };

  private srcScripts: string[] = [
    '/assets/vendor/jquery/jquery.min.js',
    '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    '/assets/vendor/jquery-easing/jquery.easing.min.js',
    '/assets/js/ruang-admin.min.js',
    '/assets/vendor/datatables/jquery.dataTables.min.js',
    '/assets/vendor/datatables/dataTables.bootstrap4.min.js'
  ]

  constructor(
    private _pantallasService: PantallasService,
    private _messagesService: MessagesService,
    private _scriptService: ScriptsService,
    private _spinnerService: SpinnerService //Se encarga de mostrar (show()) u ocultar (hide()) el protctor de pantalla de la carga da datos.
    ) {    
      this._scriptService.loadScripts(this.srcScripts);
      this.llenarGrilla();
      sessionStorage.setItem('pag', this.paginacion.pag.toString());
     }

  ngOnInit() {
  }

  //Retrocede una página de registros
  paginarAnterior(){
    if(this.paginacion.pag > 1)
    {
      this.paginacion.pag--;
      sessionStorage.setItem('pag',this.paginacion.pag.toString());
      this.llenarGrilla();
    }
    
  }

  //Avanza una página de registros
  paginarSiguiente(){
    if(this.paginacion.totPag > 1 && this.paginacion.pag < this.paginacion.totPag)
    {
      this.paginacion.pag++;
      sessionStorage.setItem('pag',this.paginacion.pag.toString());
      this.llenarGrilla();
    }
  }

  //Carga los registros del número de página recibido en el parámetros "pagina: number"
  paginar(pag: number){
    this.paginacion.pag = pag;
    this.llenarGrilla();
  }


  //Solicita los registros al servicio y los carga a la variable paginas
  private llenarGrilla(){
    this._spinnerService.show();
    this._pantallasService.get(this.paginacion.pag).subscribe(
      (res: any)=>{
       this.cargarDatos(res);
        this._spinnerService.hide();
      },(error)=>{
        console.log(error);
        this._spinnerService.hide();
        this._messagesService.mostrarMensaje(error.message,'danger');
      });
  }

  filtrar(){
    var txtFiltro = <HTMLInputElement>document.getElementById('filtro');
    var texto = txtFiltro.value;
    if(texto != ""){
      this._pantallasService.filter(texto, this.paginacion.pag).subscribe(
        (res: any)=>{
          this.cargarDatos(res);
      },(error)=>{
        console.log(error);
        this._messagesService.mostrarMensaje(error.message,'danger');
      });
    }else{
      this.llenarGrilla();
    }
  }

  //Actualiza la variable pantalla con los datos recividos en el parametro res
  //Además actualiza la variable paginacion con la información necesaria para la paginación de la tabla con datos
  private cargarDatos(res: any){
    this.pantallas = res['data']; //Datos
    this.paginacion.filas = res['rows'];  //Cantidad total de registros
    this.paginacion.totPag = Math.round(res['rows'] / res['rowsByPage']) + 1; //Calculando el total de páginas obtenidas (cantidad total de registros / registros por página)
    this.paginacion.activePag = this.paginacion.pag + 1;  //Las páginas comienzan desde 1 perio el array devuelto empieza desde 0
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k,v)=>v +1); //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
    console.log(this.paginacion.arrPagesNumbers.length);
  }

  eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?"))
    {
      this._pantallasService.delete(id).subscribe(
        (res: string[])=>{
          console.log(res);
          this._messagesService.mostrarMensaje(res['mensaje'], res['tipo-mensaje']);
          this.llenarGrilla();
      },(error)=>{
        console.log(error);
        this._messagesService.mostrarMensaje(error.message, 'danger');
      });
    }
  }

}
