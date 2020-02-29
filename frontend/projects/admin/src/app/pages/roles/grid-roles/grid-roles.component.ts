import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/service/roles.service';
import { Rol } from 'src/app/class/rol';
import { MessagesService } from 'src/app/service/messages.service';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-grid-roles',
  templateUrl: './grid-roles.component.html',
  styleUrls: ['./grid-roles.component.css']
})
export class GridRolesComponent implements OnInit {
  public roles: Rol[];
  public paginacion: paginacionInterface = {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 1,
    arrPagesNumbers: []
  }

  constructor(
    private _rolesService: RolesService,
    private _mensagesService: MessagesService,
    private _spinnerService: SpinnerService
    ) {
      this.obtenerRegistros();
     }

  ngOnInit() {
  }

  private obtenerRegistros(){
    this._spinnerService.show();
    this._rolesService.get(this.paginacion.pag).subscribe(
      (res: any)=>{
        this.actualizaResult(res);
        this._spinnerService.hide();

    },(error)=>{
      console.log(error);
      this._mensagesService.mostrarMensaje(error.message, 'danger');
      this._spinnerService.hide();
    });
  }

  public filtrar(){
    
    var txtFiltro = <HTMLInputElement>document.getElementById('filtro');
    var texto = txtFiltro.value;
    
    this.paginacion.pag = 0;
    if(texto === "")
    {      
      this.obtenerRegistros();
    }else{
      this._rolesService.filter(texto).subscribe(
        (res: any) => {
          this.actualizaResult(res);

      },(error)=>{
        console.log(error);
        this._mensagesService.mostrarMensaje(error.message, 'danger');
      });
    }    
  }

  private actualizaResult(res: any){
    this.roles = res['data'];
    this.paginacion.filas = res['rows'];
    this.paginacion.pag = res['page'];
    this.paginacion.totPag = Math.round(this.paginacion.filas / res['rowsByPage']);        
    this.paginacion.activePag = this.paginacion.pag + 1;        
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
  }

  

  public eliminar(id: number){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._rolesService.delete(id).subscribe(
        (res:string[])=>{
          this._mensagesService.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
          this._spinnerService.hide();
          this.obtenerRegistros();
      },(error)=>{
        console.log(error);
        this._mensagesService.mostrarMensaje(error.message,'danger');
        this._spinnerService.hide();
      });
    }
  }

  public paginaAnterior(){
    if(this.paginacion.pag > 0){
      this.paginacion.pag--;
      this.obtenerRegistros();
    }
  }

  public paginar(pag: number){
    this.paginacion.pag = pag;
    this.obtenerRegistros();
  }

  public paginaSiguiente(){
    if(this.paginacion.pag < this.paginacion.totPag){
      this.paginacion.pag++;
      this.obtenerRegistros();
    }
  }

}
