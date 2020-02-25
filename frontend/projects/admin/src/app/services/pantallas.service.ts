import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstService } from './const.service';
import { Pantalla } from '../clases/pantalla';

@Injectable({
  providedIn: 'root'
})
export class PantallasService {
  private endPoint: string = "admin/pantallas";

  constructor(
    private httpCliente: HttpClient,
    private _const: ConstService
  ) { }

  get(pag: number){
    return this.httpCliente.get(this._const.servidorEndPoint + this.endPoint + '/pag/' + pag)
  }

  getAll(){
    return this.httpCliente.get(this._const.servidorEndPoint + this.endPoint + '-all');
  }

  filter(text: string, pag: number){
    return this.httpCliente.get(this._const.servidorEndPoint + this.endPoint + '/filtrar/' + text +'/' + pag);
  }

  find(id: number){
    return this.httpCliente.get(this._const.servidorEndPoint + this.endPoint + '/' + id);
  }

  insert(pantalla: Pantalla){
    return this.httpCliente.post(this._const.servidorEndPoint + this.endPoint, pantalla, {headers:this._const.generateHeders()});
  }

  update(id: number, pantalla: Pantalla){
    return this.httpCliente.put(this._const.servidorEndPoint + this.endPoint + '/' + id, pantalla, {headers: this._const.generateHeders()});
  }

  delete(id: number){
    return this.httpCliente.delete(this._const.servidorEndPoint + this.endPoint + '/' + id, {headers: this._const.generateHeders()});
  }
}
