import { Component, OnInit } from '@angular/core';
import { PermisosService } from 'src/app/service/permisos.service';
import { MessagesService } from 'src/app/service/messages.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { Permisos } from 'src/app/class/permisos';
import { RolesService } from 'src/app/service/roles.service';
import { Rol } from '../../../../../../../src/app/class/rol';

@Component({
  selector: 'app-grid-permisos',
  templateUrl: './grid-permisos.component.html',
  styleUrls: ['./grid-permisos.component.css']
})
export class GridPermisosComponent implements OnInit {
  public permisos: Permisos[];
  public roles: Rol[];

  constructor(
      private _permisosServices: PermisosService,
      private _mensajesServices: MessagesService,
      private _spinnerServices: SpinnerService,
      private _rolesService: RolesService
    ) {
      this.obtenerRoles();
     }


  ngOnInit() {
  }

  private obtenerRoles(){
    this._spinnerServices.show();
    this._rolesService.getAll().subscribe(
      (res: Rol[])=>{
        this.roles = res;
        this._spinnerServices.hide();

      },(error)=>{
        this.handlerError(error);
      });
  }


  obtenerPermisos(){
    this._mensajesServices.ocultarMensaje();
    var rol = <HTMLSelectElement>document.getElementById('rol_id');

    this._spinnerServices.show();
    this._permisosServices.getByRol(parseInt(rol.value)).subscribe(
      (res:Permisos[])=>{
        this.permisos = res;
        this._spinnerServices.hide();

      },(error)=>{
        this.handlerError(error);
      })
  }

  grabar(){
    this._mensajesServices.ocultarMensaje();
    if(window.confirm("¿Desea grabar los permisos?")){
      this._spinnerServices.show();
      var permisos = <HTMLCollection>document.getElementsByClassName('chk_permisos');
      var rol = <HTMLSelectElement>document.getElementById('rol_id');
      var chk;
      var arrId = [];
      var arrPermisos: Permisos[] = [];
      console.log('permisos',permisos);
      for(let i = 0; i < permisos.length; i++){
        chk = <HTMLInputElement>permisos[i];

        arrId = chk.id.split("_");
        var objPermiso = new Permisos();

        objPermiso.id = parseInt(arrId[2] === "" ? 0 : arrId[2]);
        objPermiso.rol_id = parseInt(rol.value);
        objPermiso.pantalla_id = parseInt(arrId[3]);

        objPermiso.acceder = (<HTMLInputElement>document.getElementById(`chk_acceder_${arrId[2]}_${arrId[3]}`)).checked;
        objPermiso.crear = (<HTMLInputElement>document.getElementById(`chk_crear_${arrId[2]}_${arrId[3]}`)).checked;
        objPermiso.actualizar = (<HTMLInputElement>document.getElementById(`chk_actualizar_${arrId[2]}_${arrId[3]}`)).checked;
        objPermiso.eliminar = (<HTMLInputElement>document.getElementById(`chk_eliminar_${arrId[2]}_${+arrId[3]}`)).checked;

        arrPermisos.push(objPermiso );
      }
      console.log('Array Permisos',arrPermisos);
      
      this._permisosServices.save(arrPermisos).subscribe(
        (res: string[])=>{
          this._mensajesServices.mostrarMensaje(res['mensaje'],res['tipo-mensaje']);
          this._spinnerServices.hide();

        },(error)=>{
          this.handlerError(error);
        }
      )
    }
  }


  private handlerError(error: any){
    console.log(error);
    this._mensajesServices.mostrarMensaje(error.message, 'danger');
    this._spinnerServices.hide();
  }

  changeCheckValue(accion: string, idPermiso: number, idPantalla: number){
    let checkbox = <HTMLInputElement>document.getElementById(`chk_${accion}_${idPermiso}_${idPantalla}`);
    checkbox.checked = !checkbox.checked;
  }
  
  
}
