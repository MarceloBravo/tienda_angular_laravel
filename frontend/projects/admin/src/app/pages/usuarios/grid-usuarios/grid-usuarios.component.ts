import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { paginacionInterface } from '../../../interfaces/paginacion';
import { Usuario } from '../../../clases/usuario';
import { SpinnerService } from '../../../../../../../src/app/service/spinner.service';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-grid-usuarios',
  templateUrl: './grid-usuarios.component.html',
  styleUrls: ['./grid-usuarios.component.css']
})
export class GridUsuariosComponent implements OnInit {
  public usuarios: Usuario[];
  public paginacion: paginacionInterface = {
    pag: 0,
    filas: 0,
    totPag: 0,
    activePag: 0,
    arrPagesNumbers: [],
    filtro: '' 
  }

  constructor(
    private _usuariosService: UsuariosService,
    private _spinnerService: SpinnerService,
    private _messageService: MessagesService
  ) { 
    this.cargarRegistros();
  }

  ngOnInit(): void {
  }

  private cargarRegistros(){
    this._spinnerService.show();
    this._usuariosService.get(this.paginacion.pag).subscribe(
      (res: any[]) => {
        this.handlerSuccess(res);
    },(error)=>{
      this.handlerError(error);
    });
  }


  public eliminar(id: number){
    if(window.confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._usuariosService.delete(id).subscribe(
        (res: string[])=>{
          this._messageService.mostrarMensaje(res['mensaje'], res['tipoMensaje']);
          this._spinnerService.hide();
      },(error)=>{
        this.handlerError(error);
      });
    }
  }


  public filtrar(){
    let input = <HTMLInputElement>document.getElementById('filtro');
    this.paginacion.pag = 0;
    if(input.value !== ''){
      
      if(this.paginacion.filtro !== input.value){this.paginacion.filtro = input.value;}

      this._usuariosService.filter(input.value, this.paginacion.pag).subscribe(
        ((res: any[])=>{
          this.handlerSuccess(res);
        }),(error)=>{
          this.handlerError(error);
        });
    }else{
      this.cargarRegistros();
    }
  }
  


  public paginarAnterior(){
    if(this.paginacion.pag > 1){
      this.paginacion.pag -= 1;
      this.refreshListRecords();
    }
  }


  public paginarSiguiente(){
    if(this.paginacion.pag < this.paginacion.totPag){
      this.paginacion.pag += 1;
      this.refreshListRecords();
    }
  }


  public paginar(pag: number){
    this.paginacion.pag += pag;
    this.refreshListRecords();
  }

  
  private refreshListRecords(){
    if(this.paginacion.filtro !== ''){
      this.cargarRegistros();
    }else{
      this.filtrar();
    }
  }


  private handlerError(error: any){
    console.log(error);
    this._messageService.mostrarMensaje(error.message, 'danger');
    this._spinnerService.hide();
  }


  private handlerSuccess(res: any[]){
    this.usuarios = res['data'];
    this.paginacion.filas = res['rows'];
    this.paginacion.totPag = Math.ceil(res['rows'] / res['rowsByPage']);
    this.paginacion.activePag = this.paginacion.pag + 1;
    this.paginacion.arrPagesNumbers = Array.from({length: this.paginacion.totPag},(k ,v)=> v + 1) //ver https://stackoverflow.com/questions/36354325/angular-2-ngfor-using-numbers-instead-collections
    this._spinnerService.hide();
  }
}