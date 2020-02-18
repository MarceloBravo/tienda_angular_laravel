import { Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../../services/scripts.service'; //Importa el servicio desde éste proyecto
import { MenuService } from '../../../services/menu.service'; //Importa el servicio desde éste proyecto
import { Menus } from '../../../clases/menus';  //Importa la clase desde éste proyecto
import { MessagesService } from 'src/app/service/messages.service'; //Importa el servicio desde el proyecto principal no desed éste proyecto
import { paginacionInterface } from '../../../clases/interfaces/paginacion';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-grid-menus',
  templateUrl: './grid-menus.component.html',
  styleUrls: ['./grid-menus.component.css',
              '../../../../assets/vendor/fontawesome-free/css/all.min.css', //Ruta relativa a éste proyecto
              '../../../../assets/vendor/bootstrap/css/bootstrap.min.css',  //Ruta relativa a éste proyecto
              '../../../../assets/css/ruang-admin.min.css', //Ruta relativa a éste proyecto
              '../../../../assets/vendor/datatables/dataTables.bootstrap4.min.css']//Ruta relativa a éste proyecto
})
export class GridMenusComponent implements OnInit {
  private src: string[] = [
    '/assets/vendor/jquery/jquery.min.js',
    '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    '/assets/vendor/jquery-easing/jquery.easing.min.js',
    '/assets/js/ruang-admin.min.js',
    '/assets/vendor/datatables/jquery.dataTables.min.js',
    '/assets/vendor/datatables/dataTables.bootstrap4.min.js'
  ];
  public menus: Menus[];
  public paginacion: paginacionInterface = {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 1,
    arrPagesNumbers: Array()
  };

  constructor(
    private _scriptService: ScriptsService,
    private _menuService: MenuService,
    private _messagesServices: MessagesService,  //Importa (ver imports) el servicio desde el proyecto principal no desed éste proyecto
    private _spinnerService: SpinnerService //Se encarga de mostrar (show()) u ocultar (hide()) el protctor de pantalla de la carga da datos.
  ) {
    this._scriptService.loadScripts(this.src);
    this.cargarRegistros();
    sessionStorage.setItem('pag',this.paginacion.pag.toString());
   }

  ngOnInit() {
  }

  paginar(pagina: number){
    this.paginacion.pag = pagina;
    sessionStorage.setItem('pag',this.paginacion.pag.toString());
    console.log(this.paginacion.pag);
    this.cargarRegistros();
  }

  paginarAnterior(){
    this.paginacion.pag = this.paginacion.pag -1;
    sessionStorage.setItem('pag',this.paginacion.pag.toString());
    console.log(this.paginacion.pag);
    this.cargarRegistros();
  }
  
  paginarSiguiente(){
    this.paginacion.pag = this.paginacion.pag + 1;
    sessionStorage.setItem('pag',this.paginacion.pag.toString());
    console.log(this.paginacion.pag);
    this.cargarRegistros();
  }

  private cargarRegistros(){
  
    this._spinnerService.show();
    this._menuService.getPaginate(this.paginacion.pag).subscribe(
      (res: Menus[])=>{
        //console.log(res['data']);
        this.menus = res['data']; //Datos

        this.paginacion.pag = res['page']; //Número real de la página actual (Comienza desde 0)
        this.paginacion.filas = res['rows']; //Cantidad total de registros
        this.paginacion.totPag = Math.round( res['rows'] / res['rowsByPage'] ) + 1;  //Calculando el total de páginas obtenidas (cantidad total de registros / registros por página)
        this.paginacion.activePag = this.paginacion.pag + 1;  //Número del botón de paginación activo (Comienza desde 1)
        this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
        this._spinnerService.hide();
    },(error)=>{
      console.log(error);
      this._messagesServices.mostrarMensaje(error.message,'danger');
      this._spinnerService.hide();
    });
  }

  eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._menuService.delete(id).subscribe((res: string[])=>{
        //console.log(res);
        this._messagesServices.mostrarMensaje(res[0],res[1]);
        this.cargarRegistros(); //Contiene una llamada a this._spinnerService.hide();
      },(error)=>{
        console.log(error);
        this._messagesServices.mostrarMensaje(error.message,'danger');
        this._spinnerService.hide();
      });
    }

  }

  filtrar(){
    this._spinnerService.show();
    var input = <HTMLInputElement>document.getElementById('filtro');
    this._menuService.filter(input.value).subscribe(
      (res: Menus[])=>{
        this.menus = res;
        this._spinnerService.hide();
      }, (error)=>{
        console.log(error);
        this._messagesServices.mostrarMensaje(error.message,'danger');
        this._spinnerService.hide();
      })
  }
}
