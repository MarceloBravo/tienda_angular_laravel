import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstService } from './const.service';

@Injectable({
  providedIn: 'root'
})
export class PantallasService {
  private endPoint: string = "admin/pantallas";

  constructor(
    private httpCliente: HttpClient,
    private _const: ConstService
  ) { }

  getAll(){
    return this.httpCliente.get(this._const.servidorEndPoint + this.endPoint);
  }
}
