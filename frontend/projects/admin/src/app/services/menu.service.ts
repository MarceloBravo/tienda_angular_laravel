import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from './const.service';
import { Menus } from '../clases/menus';  //Importa la clase desde éste proyecto

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private endPoint: string = "admin/menus";

  constructor(
    private httpClient: HttpClient,
    private _const: ConstService,
    ) { }


  getAll(){
    return this.httpClient.get(this._const.servidorEndPoint + this.endPoint + '-all');
  }

  getPaginate(pag: number = 0){
    return this.httpClient.get(this._const.servidorEndPoint + this.endPoint + '/pag/' + pag);
  }

  find(id: number){
    return this.httpClient.get(this._const.servidorEndPoint + this.endPoint + '/' + id);
  }

  delete(id: number){
    return this.httpClient.delete(this._const.servidorEndPoint + this.endPoint + '/' + id,{headers: this._const.generateHeders()});
  }

  insert(menu: Menus){
    return this.httpClient.post(this._const.servidorEndPoint + this.endPoint, menu, {headers: this._const.generateHeders()});
  }

  update(id: number, menu: Menus){
    return this.httpClient.put(this._const.servidorEndPoint + this.endPoint + '/' + id, menu, {headers: this._const.generateHeders()});
  }

  filter(text: string, pag: number = 0){
    return this.httpClient.get(this._const.servidorEndPoint + this.endPoint + '/filtrar/' + text + '/' + pag);
  }



}
