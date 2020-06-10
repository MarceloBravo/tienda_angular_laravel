import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menus } from '../../clases/menus';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public mainMenuItems: Menus[];
  public subMenusItems: Menus[];


  constructor(
    private _menusService: MenuService,
    private _messageService: MessagesService
  ) { }

  ngOnInit() {
    this._menusService.getMenuBarItems().subscribe(
      (res: Menus[])=>{
        console.log(res);
        this.mainMenuItems = res;
      },(error)=>{
        console.log(error);
        this._messageService.mostrarMensaje(error.message, 'danger');
      }
    )
  }

  getSubMenus(idMenuPadre: number){
    this.subMenusItems = [];
    this._menusService.getMenuBarItems(idMenuPadre).subscribe(
      (res: Menus[])=>{
        console.log(res);
        this.subMenusItems = res;
      },(error)=>{
        console.log(error);
        this._messageService.mostrarMensaje(error.message, 'danger');
      }
    )
  }

}
