import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  private endPoint: string = "http://127.0.0.1:8000/api/";

  constructor(private httpClient: HttpClient) { }

  getFirstState(){
    return this.httpClient.get(this.endPoint + "estados_compras_inicial");
  }
}
