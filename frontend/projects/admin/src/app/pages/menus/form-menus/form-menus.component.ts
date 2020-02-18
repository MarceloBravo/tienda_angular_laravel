import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { Menus } from '../../../clases/menus';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { element } from 'protractor';
import { Pantalla } from '../../../clases/pantalla';
import { PantallasService } from '../../../services/pantallas.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-form-menus',
  templateUrl: './form-menus.component.html',
  styleUrls: ['./form-menus.component.css']
})
export class FormMenusComponent implements OnInit {
  private menu: Menus = new Menus();
  public menus: Menus[];
  private id: number = 0;
  public pantallas: Pantalla[];

  constructor(
    private _menusService: MenuService,
    private activatedRoute: ActivatedRoute,
    private _messagesService: MessagesService,
    private _pantallasService: PantallasService,
    private _spinnerService: SpinnerService //Se encarga de mostrar (show()) u ocultar (hide()) el protctor de pantalla de la carga da datos.
    ) {
      var id = this.activatedRoute.snapshot.paramMap.get('id');      
      if(id != undefined){
        this.id = parseInt(id);
        this.buscar();
      }
      this.cargarMenus();
      this.cargarPantallas();
    }

  ngOnInit() {
  }

  private buscar(){
    this._spinnerService.show();
    this._menusService.find(this.id).subscribe(
      (res: Menus)=>{        
        this.menu = res;
        if(res.id == undefined){
          this.menu.pantalla_id = 0;
          this.menu.menu_padre_id = 0;
        }
        //console.log(res);
        var actionTitle = <HTMLHtmlElement>document.getElementById('action-title');
        actionTitle.innerHTML = "Editando...";
    },(error)=>{
      this._messagesService.mostrarMensaje(error.message, 'danger');
      this._spinnerService.hide();
    });
  }

  private cargarMenus(){
    this._spinnerService.show();
    this._menusService.getAll().subscribe(
      (res: Menus[])=>{

        this.menus = this.addDefaultItem(res, new Menus(), this.menu.id);
        this._spinnerService.hide();
    },(error)=>{
      console.log(error);
      var menu = new Menus()
      menu.nombre = error.message;
      this.menus.push(menu);
      this._spinnerService.hide();
    });
  }


  grabar(){
    if(confirm("¿Desea grabar el registro")){
      if(this.id > 0){
        this.actualizar();
      }else{
        this.insertar();
      }
    }
  }

  private insertar(){
    this._spinnerService.show();
    console.log(this.menu);
    this._menusService.insert(this.menu).subscribe(
      (res: string[] )=>{

        this.mostrarMensajes(res);
        this._spinnerService.hide();
      },(error)=>{
        this._messagesService.mostrarMensaje(error.message, 'danger');
        console.log(error);
        this._spinnerService.hide();
      });
  }


  private actualizar(){
    this._spinnerService.show();    
    this._menusService.update(this.id, this.menu).subscribe(
      (res: string[] )=>{

        this.mostrarMensajes(res);
        this._spinnerService.hide();
      },(error)=>{
        this._messagesService.mostrarMensaje(error.message, 'danger');
        console.log(error);
        this._spinnerService.hide();
      });
  }


  eliminar(){
    if(confirm("¿Desea eliminar el registro?")){
      this._spinnerService.show();
      this._menusService.delete(this.id).subscribe(
        (res: string[])=>{

        this.mostrarMensajes(res);
        this._spinnerService.hide();
      },(error)=>{
        this._messagesService.mostrarMensaje(error.message, 'danger');
        console.log(error);
        this._spinnerService.hide();
      });
    }
  }


  private mostrarMensajes(res: string[]){
    var errores: string = "";
        for(let i in res['errores']){
          console.log(res['errores'][i][0]);
          errores += '<br/>' + res['errores'][i][0];
        }
        this._messagesService.mostrarMensaje(res['mensaje'] + errores, res['tipo-mensaje']);
  }

  cargarPantallas(){
    this._spinnerService.show();
    this._pantallasService.getAll().subscribe(
      (res: Pantalla[])=>{

        this.pantallas = this.addDefaultItem(res, new Pantalla());
        this._spinnerService.hide();
      },(error)=>{
        console.log(error);
        this._messagesService.mostrarMensaje(error.message, 'danger');
        this._spinnerService.hide();
      });
  }

  private addDefaultItem(res, item: any, excludeId: number = 0){
    var arrayItems: any[] = res.filter(function(e){return e.id != excludeId});
    item.id = 0;
    item.nombre = arrayItems.length > 0 ? "-- Seleccione --" :"-- No se encontraron registros --";
    arrayItems.push(item);
    return arrayItems.sort((x,y)=>x.id - y.id);
  }
  
}
